"use client";
import { ReactNode, createContext, use, useContext, useEffect, useState } from "react";
import WebSocketServer from "@/services/websocket/socket.io";
import { UserAppStateType } from "@/types/user.types";
import { AuthContext } from "./AuthContext";

export type MessageStatus = 'sent' | 'received' | 'viewed';

export interface Message {
    id: string;
    content: string;
    status: MessageStatus;
    origin: string;
    destination: string;
    timestamp: number;
}

type MessageContext = {
    messages: Map<string, Message[]>;
    sendMessage: (message: Omit<Omit<Message, "id">, "status">) => void;
    loadChatHistory: (destination: string) => void;
    setLoggedUser: (user: UserAppStateType) => void;
}

export const MessageContext = createContext({} as MessageContext);

export function MessageProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Map<string, Message[]>>(new Map());
    const { user } = useContext(AuthContext);
    const socket = WebSocketServer;
    let loggedUser: UserAppStateType | null = user;

    useEffect(() => {
        if (user) {
            loggedUser = user;
        }
    }, [user]);

    const setLoggedUser = (user: UserAppStateType) => {
        loggedUser = user;
    };

    const sendMessage = (message: Omit<Omit<Message, "id">, "status">) => {
        socket.emit('message:send', message);
    };

    const loadChatHistory = (destination: string) => {
        socket.emit('message:chat:history', {origin: loggedUser?.id, destination});
    };

    socket.on('message:server:chat:history', (data: any) => {
        const { chat, messageHistory } = data;

        const currentMessages = messages.get(chat) || [];

        messageHistory.filter((msg: Message) => !currentMessages.some((historyMsg: Message) => historyMsg.id === msg.id));
        const newMessages = [...currentMessages, ...messageHistory];

        messages.set(chat, newMessages);
        setMessages(new Map(messages));
    });

    socket.on('message:new', (message: Message) => {
        const chat = message.origin;

        if (messages.get(chat)?.some((msg) => msg.id === message.id)) {
            return;
        }

        const payload: Message = {
            ...message,
            status: 'received',
        }

        socket.emit('message:status:update', payload);

        const currentMessages = messages.get(chat) || [];
        const newMessages = [...currentMessages, message];
        messages.set(chat, newMessages);
        setMessages(new Map(messages));
    });

    // Server confirmation of message received.
    socket.on('message:server:recieved', (message: Message) => {
        const chat = message.destination;
        if (messages.get(chat)?.some((msg) => msg.id === message.id)) {
            return;
        }

        const currentMessages = messages.get(chat) || [];
        const newMessages = [...currentMessages, message];
        messages.set(chat, newMessages);
        setMessages(new Map(messages));
    });

    socket.on('message:status-changed', (message: Message) => {
        if (loggedUser?.id === message.destination
            || loggedUser?.id !== message.origin) return;

        const chat = messages.get(message.destination)?.some((msg) => msg.id === message.id)
            ? message.destination
            : message.origin;

        const chatMessages = messages.get(chat) || [];
        chatMessages.map((msg) => {
            if (msg.id === message.id) {
                msg.status = message.status;
            }
        });

        messages.set(chat, chatMessages)
        setMessages(new Map(messages));
    });
    
    return (
        <MessageContext.Provider value={{ messages, sendMessage, loadChatHistory, setLoggedUser }}>
            {children},
        </MessageContext.Provider>
    );
}
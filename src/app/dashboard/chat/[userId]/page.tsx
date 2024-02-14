"use client";

import { Button } from "@/components/ui/button";
import { UserStatus } from "@/components/ui/userStatus";
import { usePathname } from "next/navigation";
import UserService from '@/services/user.service';
import { UserAppStateType } from "@/types/user.types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import MessageBox from "@/components/ui/message-box";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Message, MessageContext } from "@/contexts/MessageContext";
import { AuthContext } from "@/contexts/AuthContext";

export default function Chat() {
    const [user, setUser] = useState<Omit<UserAppStateType, "token"> | null>(null);
    const { messages, sendMessage, loadChatHistory, setLoggedUser } = useContext(MessageContext);
    const { user: loggedUser } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const { onlineUsers } = useContext(UserContext);
    const router = usePathname();
    const userId = router.split("/")[3];
    let chatMessages: Message[] = messages.get(userId) || [];

    interface SendMessageDto {
        content: string;
        origin: string;
        destination: string;
        timestamp: number;
    }

    const handleSendMessage = (data: Record<string, string>) => {
        if (!loggedUser) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Sessão expirada. Faça login novamente.",
            });

            return;
        }

        const message: SendMessageDto = {
            content: data.content,
            origin: loggedUser.id,
            destination: userId,
            timestamp: Date.now(),
        }

        sendMessage(message);
    }

    useEffect(() => {
        if (!loggedUser) return;
        chatMessages = messages.get(userId) || [];
        chatMessages.filter((message) => message.origin === loggedUser.id || message.destination === loggedUser.id);
    }, [messages]);

    useEffect(() => {
        const status = onlineUsers.some((onlineUser) => onlineUser.id === user?.id) ? "online" : "offline";
        user && setUser({ ...user, status });
    }, [onlineUsers]);

    useEffect(() => {
        const fetch = async () => {
            const user = await UserService.getById(userId) as Omit<UserAppStateType, "token">;
            setUser(user);
        }

        fetch();

        if (loggedUser) {
            setLoggedUser(loggedUser);
            loadChatHistory(userId);
        }
        
    }, []);

    return (
        <main className="flex flex-col h-full bg-gray-200">
            {/* Parte superior */}
            <div className="flex items-center justify-between p-4 bg-white">
                <div className="flex items-center gap-4">
                    
                    <div style={{overflow: 'hidden'}} 
                        className="border-4 border-zinc-300 rounded-full w-16" 
                        dangerouslySetInnerHTML={{ __html: user?.profileImage || "" }} />

                    <div>
                        <span className="text-lg font-semibold">{user?.name}</span>
                        <UserStatus status={user?.status || "offline"} />
                    </div>
                </div>
            </div>

            {/* Parte do meio */}
            <div className="flex-grow bg-gray-100">
                <MessageBox messages={messages.get(userId)} destination={userId} loggedUserId={loggedUser?.id} />
            </div>

            {/* Parte inferior */}
            <form onSubmit={handleSubmit(handleSendMessage)} className="flex items-center p-4 bg-white">
                <textarea
                    {...register('content', { required: true })}
                    className="flex-grow h-20 border rounded-md resize-none p-4"
                    placeholder="Digite sua mensagem aqui..."
                ></textarea>
                <Button type="submit" className="ml-2 px-4 py-2">Enviar</Button>
            </form>
        </main>
    );
}

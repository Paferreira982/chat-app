"use client";

import { UserDto } from "@/types/user.types";
import { ReactNode, createContext, useEffect, useState } from "react";
import WebSocketServer from "@/services/websocket/socket.io";

type UserContext = {
    onlineUsers: UserDto[];
}

export const UserContext = createContext({} as UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
    const [onlineUsers, setOnlineUsers] = useState<UserDto[]>([]);
    const socket = WebSocketServer;

    socket.on('user:online-users', (_onlineUsers: UserDto[]) => {
        setOnlineUsers(_onlineUsers);
    });

    useEffect(() => {
        socket.emit('user:get-online-users', {});
    }, []);
    
    return (
        <UserContext.Provider value={{ onlineUsers }}>
            {children},
        </UserContext.Provider>
    );
}
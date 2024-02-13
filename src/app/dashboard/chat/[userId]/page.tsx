"use client";

import { Button } from "@/components/ui/button";
import { UserStatus } from "@/components/ui/userStatus";
import { usePathname } from "next/navigation";
import UserService from '@/services/user.service';
import { UserAppStateType } from "@/types/user.types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function Chat() {
    const [user, setUser] = useState<Omit<UserAppStateType, "token"> | null>(null);
    const { onlineUsers } = useContext(UserContext);
    const router = usePathname();
    const userId = router.split("/")[3];

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
                {/* Conteúdo da parte do meio */}
            </div>

            {/* Parte inferior */}
            <div className="flex items-center p-4 bg-white">
                <textarea
                    className="flex-grow h-20 border rounded-md resize-none p-4"
                    placeholder="Digite sua mensagem aqui..."
                ></textarea>
                <Button className="ml-2 px-4 py-2">Enviar</Button>
            </div>
        </main>
    );
}

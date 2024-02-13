"use client";
import { Button } from "@/components/ui/button";
import { UserStatus } from "@/components/ui/userStatus";
import { UserAppStateType, UserStatusPtBrType } from "@/domain/user/entities/types";
import { usePathname } from "next/navigation";

export default async function Chat() {
    const router = usePathname();
    const userId = router.split("/")[3];

    const response = await fetch(`http://localhost:3000/api/users?userId=${userId}`, {
        cache: "no-cache",
    });

    const user = await response.json() as UserAppStateType;
    user.status = 'online';

    return (
        <main className="flex flex-col h-full bg-gray-200">
            {/* Parte superior */}
            <div className="flex items-center justify-between p-4 bg-white">
                <div className="flex items-center gap-4">
                    
                    <div style={{overflow: 'hidden'}} 
                        className="border-4 border-zinc-300 rounded-full w-16" 
                        dangerouslySetInnerHTML={{ __html: user.profileImage }} />

                    <div>
                        <span className="text-lg font-semibold">{user.name}</span>
                        <UserStatus status={user.status} />
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

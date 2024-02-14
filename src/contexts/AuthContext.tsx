'use client';

import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from 'next/navigation'
import { UserAppStateType } from "@/types/user.types";
import AuthService from "@/services/auth.service";
import userService from "@/services/user.service";
import WebSocketServer from "@/services/websocket/socket.io";

type AuthContextType = {
    user: UserAppStateType | null;
    signIn: (data: SignInDataDto) => Promise<UserAppStateType>;
    logout: () => void;
}

export type SignInDataDto = {
    email: string;
    password: string;
    remainLogged?: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserAppStateType | null>(null);
    const router = useRouter()

    async function signIn({ email, password, remainLogged }: SignInDataDto) {
        let _rawUser = await AuthService.login(email, password) as any;

        if ('error' in _rawUser) {
            throw new Error(_rawUser.error);
        }

        const rawUser = _rawUser._doc;

        const loggedUser: UserAppStateType = {
            id: rawUser.id,
            name: rawUser.name,
            email: rawUser.email,
            profileImage: rawUser.profileImage,
            token: rawUser.token,
            status: 'online',
        }

        if (remainLogged) {
            setCookie(undefined, 'token', loggedUser.token, {
                maxAge: 60 * 60 * 24, // 24 hour
            });

            setCookie(undefined, 'userId', loggedUser.id, {
                maxAge: 60 * 60 * 24, // 24 hour
            });
        }

        WebSocketServer.emit('user:login', _rawUser);
        setUser(loggedUser);
        
        router.push("/dashboard");
        return loggedUser;
    }

    function logout() {
        setUser(null);
        destroyCookie(undefined, 'token');
        destroyCookie(undefined, 'userId');
        WebSocketServer.emit('user:logout', user?.id);
        router.push("/login");
    }

    useEffect(() => {
        const { token, userId } = parseCookies();

        if (!token) {
            router.push("/login");
        } else {
            userService.getById(userId, token).then((response) => {
                if (!response || 'error' in response) {
                    return router.push("/login");
                }

                setUser({
                    id: response.id,
                    name: response.name,
                    email: response.email,
                    profileImage: response.profileImage,
                    token,
                    status: 'online',
                });
            });
        }

    }, []);

    return (
        <AuthContext.Provider value={{ signIn, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

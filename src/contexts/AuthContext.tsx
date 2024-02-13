'use client';

import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from 'next/navigation'
import { UserAppStateType } from "@/domain/user/entities/types";

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserAppStateType | null;
    signIn: (data: SignInDataDto) => Promise<void>;
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
    const isAuthenticated = !!user;

    async function signIn({ email, password, remainLogged }: SignInDataDto) {   
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 401) {
            throw new Error('UNAUTHORIZED');
        }

        if (!response.ok) {
            throw new Error('INTERNAL_SERVER_ERROR');
        }

        const { token } = await response.json();

        if (remainLogged) {
            setCookie(undefined, 'token', token, {
                maxAge: 60 * 60 * 24, // 24 hour
            });
        }
        
        router.push("/dashboard");
    }

    useEffect(() => {
        const { token } = parseCookies();

        if (!token) {
            // router.push("/login");
        } else {
            // setUser({
            //     email: "pedro@pedro.com",
            //     name: 'John Doe',
            //     avatar_url: "12346"
            // });
        }

    }, []);

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
}

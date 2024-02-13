'use client';

import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from 'next/navigation'
import { UserAppStateType } from "@/types/user.types";
import AuthService from "@/services/auth.service";

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
        const user = await AuthService.login(email, password);

        if ('error' in user) {
            throw new Error(user.error);
        }

        if (remainLogged) {
            setCookie(undefined, 'token', user.token, {
                maxAge: 60 * 60 * 24, // 24 hour
            });
        }
        
        router.push("/dashboard");
    }

    // TODO: Rever esse problema do cookie
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { AuthProvider } from '../contexts/AuthContext'
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/contexts/UserContext";
import { MessageProvider } from "@/contexts/MessageContext";

export const font = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "IXCSoft - Chat em tempo real",
  description: "Aplicação de chat em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          font.variable
        )}>
        <AuthProvider>
          <UserProvider>
            <MessageProvider>
              {children}
            </MessageProvider>
          </UserProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

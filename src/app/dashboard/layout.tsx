'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Channel } from "@/components/ui/channel";
import { UserContext, UserProvider } from "@/contexts/UserContext";
import { UserAppStateType } from "@/domain/user/entities/types";
import { LogOutIcon } from "lucide-react";
import { useContext } from "react";
import io, { Socket } from "socket.io-client";
import { MessagePropsType } from '@/domain/message/entities/types';

let socket: Socket;

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  const [users, setUsers] = useState<UserAppStateType[]>([]);
  const [loggedUser, setLoggedUser] = useState<UserAppStateType | null>(null);
  const { onlineUsers } = useContext(UserContext);

  useEffect(() => {
    const initilizeSocket = async () => {
      await fetch('http://localhost:3000/api/socket');

      const socket = io('http://localhost:4000/api/socket', { path: '/api/socket' });

      socket.on('connect', () => {
        console.log('connected to socket.io server');
      });
  
      socket.emit('send-message', { message: 'Hello, world!' });
  
      socket.on('receive-message', (message) => {
        console.log(message);
      });
    }
    
    initilizeSocket();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/list", {
          cache: "no-cache",
        });
        const fetchedUsers = await response.json() as UserAppStateType[];
        const loggedUser = fetchedUsers[0];

        const filteredUsers = fetchedUsers
          .filter((user) => user.id !== loggedUser.id && (onlineUsers.find((onlineUser) => onlineUser.id === user.id) === undefined))
          .map((user) => { user.status = 'offline'; return user; });

        const users = filteredUsers.concat(onlineUsers);

        setUsers(users.sort((a, b) => a.status === 'online' ? -1 : 1));
        setLoggedUser(loggedUser);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [onlineUsers]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="flex-none w-11/12 h-5/6">
        <div className="flex-none w-full text-white p-4 pb-24" style={{ height: '10%' }}>
          <div className="flex-none flex justify-between">
            <div className="pl-4 flex-none w-1/2 text-2xl text-black font-bold flex items-center">
              Mensagens
            </div>
            <div className="flex-none w-1/2 flex justify-end">
              <div className='flex gap-x-4 px-6 py-3 leading-6 text-gray-900'>
                <div className='flex-none flex flex-col'>
                  <span aria-hidden='true' className="text-lg font-bold text-gray-700 text-right">
                    {loggedUser && loggedUser.name}
                  </span>
                  <span className='flex-none text-lg font-semibold text-gray-500 text-right' aria-hidden='true'>
                    {loggedUser && loggedUser.email}
                  </span>
                </div>
                <div className='flex-none w-16'>
                  <div style={{ overflow: 'hidden' }} className="border-4 border-zinc-300 rounded-full" dangerouslySetInnerHTML={{ __html: loggedUser?.profileImage as string }}></div>
                </div>
              </div>
              <LogOutIcon className='h-full text-black cursor-pointer hover:text-gray-500 w-6' />
            </div>
          </div>
        </div>

        <div className="flex flex-grow border-t" style={{ height: '89.7%' }}>
          <div className="text-white p-4 w-1/3 overflow-y-scroll overflow-x-clip">
            <Channel users={users} />
          </div>

          <div className="w-full border-l">
              {children}
          </div>
        </div>
      </Card>
    </div>
  );
}

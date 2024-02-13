'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Channel } from "@/components/ui/channel";
import { UserContext } from "@/contexts/UserContext";
import { LogOutIcon } from "lucide-react";
import { useContext } from "react";
import { UserDto } from '@/types/user.types';
import UserService from '@/services/user.service';
import { AuthContext } from '@/contexts/AuthContext';

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  const [users, setUsers] = useState<UserDto[]>([]);
  const { onlineUsers } = useContext(UserContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await UserService.getAll() as UserDto[];

        const allUsers = fetchedUsers // Users different from the logged user and not online.
          .filter((fetched_user) => 
            fetched_user.id !== user?.id 
            && !(onlineUsers.find((onlineUser) => onlineUser.id === fetched_user.id))) 
          .map((fetched_user) => { // Set status to offline.
            fetched_user.status = 'offline'; 
            return fetched_user; 
          })

        const onlineUsersMap = onlineUsers
          .filter((onlineUser) => onlineUser.id !== user?.id)
          .map((onlineUser) => { // Set status to offline.
            onlineUser.status = 'online'; 
            return onlineUser; 
          });

        const users = allUsers.concat(onlineUsersMap);

        setUsers(users.sort((a, b) => a.status === 'online' ? -1 : 1)); // Sort users by status.
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [user, onlineUsers]);

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
                    {user && user.name}
                  </span>
                  <span className='flex-none text-lg font-semibold text-gray-500 text-right' aria-hidden='true'>
                    {user && user.email}
                  </span>
                </div>
                <div className='flex-none w-16'>
                  <div style={{ overflow: 'hidden' }} className="border-4 border-zinc-300 rounded-full" dangerouslySetInnerHTML={{ __html: user?.profileImage as string }}></div>
                </div>
              </div>
              <LogOutIcon className='h-full text-black cursor-pointer hover:text-gray-500 w-6' onClick={logout} />
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

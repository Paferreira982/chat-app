"use client";

import { useState } from 'react';
import { UserAppStateType, UserStatusPtBrType, UserStatusType } from "@/domain/user/entities/types";
import Link from "next/link";
import { Badge } from "./badge";

export function Channel({ users }: { users: UserAppStateType[] }) {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const handleChannelClick = (userId: string) => {
    setSelectedChannel(userId);
  };

  return (
    <>
      {users.map((user: UserAppStateType) => (
        <Link href={`/dashboard/chat/${user.id}`} key={user.id}>
          <div
            className={`w-full h-24 ${selectedChannel === user.id ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg mt-4 cursor-pointer hover:bg-blue-50`}
            onClick={() => handleChannelClick(user.id)}
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4 max-w-full">
                <div className="rounded-full">
                  <div style={{ overflow: 'hidden' }} className="border-4 border-zinc-300 rounded-full w-16" dangerouslySetInnerHTML={{ __html: user.profileImage }} />
                </div>
                <div className="w-10/12">
                  <h2 className="text-lg text-black font-semibold">{user.name}</h2>
                  <p className="text-gray-400 text-sm truncate italic">
                    <b>Você:</b> Minha última mensagem recebida foi essa, parara perere parara perere parara perere
                  </p>
                  <Badge status={user.status} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}


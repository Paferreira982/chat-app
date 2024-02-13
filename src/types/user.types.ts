export type UserStatusType = 'online' | 'offline' | 'busy' | 'away';

export type UserAppStateType = {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    token: string;
    status: UserStatusType;
}

export type UserDto = {
    _id: string,
    id: string,
    name: string,
    email: string,
    password: string,
    profileImage: string,
    deletedAt: string | null,
    createdAt: string,
    updatedAt: string,
    status: UserStatusType,
    __v: number
}
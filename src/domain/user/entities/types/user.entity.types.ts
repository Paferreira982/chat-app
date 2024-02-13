import { EntityPropsType } from "@/domain/@shared/entities/types";

export type UserPropsType = {
    name: string;
    email: string;
    password: string;
    profileImage: string;
}

export type UserEntityPropsType = UserPropsType & EntityPropsType;

export type UserStatusType = 'online' | 'offline' | 'busy' | 'away';

export const UserStatusPtBrType = {
    online: 'Online',
    offline: 'Offline',
    busy: 'Ocupado',
    away: 'Ausente'
}

export type UserAppStateType = {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    token: string;
    status: UserStatusType;
}

export type UserTokenGenerateType = {
    email: string;
    name: string;
    profileImage: string;
}

export type UserUpdateDto = {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    profileImage?: string;
}

export type UserBuildDto = {
    name: string;
    email: string;
    password: string;
    profileImage: string;
}

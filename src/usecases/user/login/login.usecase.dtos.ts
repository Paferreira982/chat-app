import { UserAppStateType } from "@/domain/user/entities/types";

export type UserLoginInputDto = {
    email: string;
    password: string;
}

export type UserLoginOutputDto = UserAppStateType;

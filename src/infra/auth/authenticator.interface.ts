import { UserAppStateType, UserTokenGenerateType } from "@/domain/user/entities/types";

/**
 * @interface Authenticator
 * @description Contract interface for Auth.
 * @template T Type of the data to be generated and decoded.
 * */
export default interface Authenticator {
    validate(token: string): Promise<boolean>;
    generate(data: UserTokenGenerateType): Promise<string>;
    decode(token: string): Promise<UserAppStateType>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}
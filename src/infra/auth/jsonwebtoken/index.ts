import Authenticator from "../authenticator.interface";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { UserAppStateType, UserTokenGenerateType } from "@/domain/user/entities/types";

class JsonWebToken implements Authenticator {

    private readonly secret: string = process.env.JWT_SECRET || 'secret';
    private readonly saltRounds: number = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

    public async generate(data: UserTokenGenerateType): Promise<string> {
        return jwt.sign(data, this.secret, { expiresIn: '1d' });
    }

    public async validate(token: string): Promise<boolean> {
        return jwt.verify(token, this.secret) ? true : false;
    }

    public async decode(token: string): Promise<UserAppStateType> {
        return jwt.verify(token, this.secret) as UserAppStateType;
    }

    public async hashPassword(password: string): Promise<string> {
        return hash(password, this.saltRounds);
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }
}

export default new JsonWebToken();
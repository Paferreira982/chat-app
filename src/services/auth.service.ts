import { UserAppStateType } from "@/types/user.types";
import { Service } from "./service.abstract";

class AuthService extends Service {
    public constructor() {
        const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';
        super(`${serverUrl}/auth`);
    }

    public async login(email: string, password: string) {
        return this.post<UserAppStateType>("/login", { email, password });
    }
}

export default new AuthService();
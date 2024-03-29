import { UserDto } from "@/types/user.types";
import { Service } from "./service.abstract";

class UserService extends Service {
    public constructor() {
        const serverUrl = process.env.SERVER_URL || 'http://localhost:4000';
        super(`${serverUrl}/users`);
    }

    public async getAll(token?: string) {
        return this.get<UserDto[]>("/", token);
    }

    public async getById(id: string, token?: string) {
        return this.get<UserDto>(`/${id}`, token);
    }

    public async create(user: UserDto) {
        return this.post<UserDto>("/", user);
    }
}

export default new UserService();
import { UserDto } from "@/types/user.types";
import { Service } from "./service.abstract";

class UserService extends Service {
    public constructor() {
        super("http://localhost:4000/users");
    }

    public async getAll() {
        return this.get<UserDto[]>("/");
    }

    public async getById(id: string) {
        return this.get<UserDto>(`/${id}`);
    }

    public async create(user: UserDto) {
        return this.post<UserDto>("/", user);
    }
}

export default new UserService();
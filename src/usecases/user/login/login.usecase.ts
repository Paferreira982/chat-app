import { Usecase } from "@/usecases/usecase.interface";
import { UserLoginInputDto, UserLoginOutputDto } from "./login.usecase.dtos";
import Authenticator from "@/infra/auth/authenticator.interface";
import RepositoryInterface from "@/infra/repository/repository.interface";
import { UserEntityPropsType, UserUpdateDto } from "@/domain/user/entities/types";

export class LoginUsecase implements Usecase<UserLoginInputDto, UserLoginOutputDto> {
    public constructor(
        private readonly userRepository: RepositoryInterface<UserEntityPropsType, UserUpdateDto>,
        private readonly authenticator: Authenticator,
    ) {}

    public async execute(input: UserLoginInputDto): Promise<UserLoginOutputDto> {
        const user = await this.userRepository.findByEmail(input.email);

        if (!user || !this.authenticator.comparePassword(input.password, user.password)) {
            throw new Error("Invalid Credentials");
        }

        const token = await this.authenticator.generate({
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
        });

        return {
            email: user.email,
            name: user.name,
            profileImage: user.profileImage,
            token,
        }
    }
}
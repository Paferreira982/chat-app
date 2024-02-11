import { Entity } from "@/domain/@shared/entities/entity.abstract";
import { UserBuildDto, UserPropsType } from "./types";
import { EntityPropsType } from "@/domain/@shared/entities/types";

export class User extends Entity<UserPropsType> {
    private constructor({
        id,
        name,
        email,
        password,
        profileImage,
        createdAt,
        deletedAt,
        updatedAt,
    }: EntityPropsType & UserPropsType) {
        const props = { name, email , password, profileImage};
        super('User', { id, createdAt, deletedAt, updatedAt, props });
    }

    /**
     * Build method.
     * @description This method is used to build an user entity.
     * @param name User name.
     * @param email User email.
     * @param password User password.
     * @param profileImage User profile image.
     * @returns An user entity.
     * @throws {DomainException} If the provided data is invalid.
     */
    public static build({
        name,
        email,
        password,
        profileImage,
    }: UserBuildDto): User {
        return new User({
            ...Entity.buildDefault(),
            name,
            email,
            password,
            profileImage,
        });
    }

    // GETTERS & SETTERS
    public get name(): string {
        return this.props.name;
    }

    public get email(): string {
        return this.props.email;
    }

    public get password(): string {
        return this.props.password;
    }

    public get profileImage(): string {
        return this.props.profileImage;
    }
}


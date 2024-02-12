import { UserUpdateDto, UserEntityPropsType } from "@/domain/user/entities/types";
import RepositoryInterface from "../../repository.interface";
import MongoDBDriver from "../../driver/mongodb/mongodb.driver";
import UserSchema from "./user.schema";

/**
 * @class UserRepository
 * @description Repository for User Entity.
 * @params EntityPropsType, UpdatePropsType
 */
class UserRepository implements RepositoryInterface<UserEntityPropsType, UserUpdateDto> {

    constructor() {
        try {
            MongoDBDriver.conn.model('User', UserSchema);
        } catch (error) {
            console.warn("User Model already registered and compiled.");
        }
    }

    public async create(data: UserEntityPropsType): Promise<UserEntityPropsType> {
        const UserModel = MongoDBDriver.conn.model('User');
        const instance = new UserModel(data);
        return await instance.save();
    }

    public async update(data: UserUpdateDto & { [key: string]: any }): Promise<UserEntityPropsType> {
        const UserModel = MongoDBDriver.conn.model('User');
        const instance = await UserModel.findOne({ id: data.id });

        if (Object.keys(data).length < 2) {
            throw new Error('No data to update');
        }
        
        if (!instance) {
            throw new Error('User Model not found');
        }

        Object.keys(data).forEach((key) => {
            if (key !== 'id') {
                instance.set(key, data[key]);
            }
        });

        return await instance.save() as UserEntityPropsType;
    }

    public async delete(id: string): Promise<boolean> {
        const UserModel = MongoDBDriver.conn.model('User');
        const instance = await UserModel.findOne({ id });

        if (!instance) {
            throw new Error('User Model not found');
        }

        instance.set("deletedAt", new Date());
        const result = await instance.save();

        return result !== null;
    }

    public async findById(id: string): Promise<(UserEntityPropsType) | null> {
        const UserModel = MongoDBDriver.conn.model('User');
        return await UserModel.findOne({ id });
    }

    public async findAll(): Promise<(UserEntityPropsType)[]> {
        const UserModel = MongoDBDriver.conn.model('User');
        return await UserModel.find({ deletedAt: null });
    }

    public async findByEmail(email: string): Promise<(UserEntityPropsType) | null> {
        const Model = MongoDBDriver.conn.model('User');
        return await Model.findOne({ email });
    }
}

export default new UserRepository();

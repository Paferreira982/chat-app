import { UserEntityPropsType } from "@/domain/user/entities/types";
import MongoDBDriver from "../../driver/mongodb/mongodb.driver";

const Schema = MongoDBDriver.conn.Schema;

const UserSchema = new Schema<UserEntityPropsType>({
    id: {
        type: String,
        required: true,
        unique: true,
        indexes: true
    },
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    email: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 100,
        indexes: true,
        unique: true,
    },
    password: { 
        type: String, 
        required: true,
    },
    profileImage: { 
        type: String, 
        required: false
    },
    deletedAt: {
        type: Date,
        required: false,
    }
    },
    {
        timestamps: true,
    }
);

export default UserSchema;

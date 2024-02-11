import { EntityYupSchema } from '@/domain/@shared/validators/yup/schemas/entity.validator.yup';
import { UserPropsType } from '@/domain/user/entities/types';
import * as yup from 'yup';

export const UserSchema: yup.ObjectSchema<UserPropsType> =
    EntityYupSchema.concat(
        yup.object().shape({
            name: yup.string().min(3).required(),
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
            profileImage: yup.string().required(),
        }),
    );

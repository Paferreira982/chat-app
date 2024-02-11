import { ValidatorInterface } from '@/domain/@shared/validators/validator.interface';
import { YupValidator } from '@/domain/@shared/validators/yup/yup.validator';
import { UserSchema } from './schemas/user.yup.schema';
import { User } from '../../entities/user.entity';

export class UserYupValidator
    extends YupValidator
    implements ValidatorInterface<User>
{
    public validate(entity: User): void {
        this.run(entity, UserSchema);
    }
}
import { ValidatorFactory } from '@/domain/@shared/factories/factory.abstract';
import { ValidatorInterface } from '@/domain/@shared/validators/validator.interface';
import { User } from '../entities/user.entity';
import { UserYupValidator } from '../validators/yup/user.yup.validator';

class UserValidatorFactory extends ValidatorFactory<User> {
    public build(): ValidatorInterface<User> {
        return new UserYupValidator();
    }
}

export default new UserValidatorFactory();
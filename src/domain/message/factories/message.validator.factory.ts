import { ValidatorFactory } from '@/domain/@shared/factories/factory.abstract';
import { ValidatorInterface } from '@/domain/@shared/validators/validator.interface';
import { Message } from '../entities/message.entity';
import { MessageYupValidator } from '../validators/yup/message.yup.validator';

class MessageValidatorFactory extends ValidatorFactory<Message> {
    public build(): ValidatorInterface<Message> {
        return new MessageYupValidator();
    }
}

export default new MessageValidatorFactory();
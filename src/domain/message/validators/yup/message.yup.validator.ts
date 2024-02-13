import { ValidatorInterface } from '@/domain/@shared/validators/validator.interface';
import { YupValidator } from '@/domain/@shared/validators/yup/yup.validator';
import { MessageSchema } from './schemas/message.yup.schema';
import { Message } from '../../entities/message.entity';

export class MessageYupValidator
    extends YupValidator
    implements ValidatorInterface<Message>
{
    public validate(entity: Message): void {
        this.run(entity, MessageSchema);
    }
}
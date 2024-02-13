import { EntityYupSchema } from '@/domain/@shared/validators/yup/schemas/entity.validator.yup';
import { MessagePropsType, MessageStatus } from '@/domain/message/entities/types';
import * as yup from 'yup';

export const MessageSchema: yup.ObjectSchema<MessagePropsType> =
    EntityYupSchema.concat(
        yup.object().shape({
            origin: yup.string().min(3).max(40).required(),
            destination: yup.string().min(3).max(40).required(),
            content: yup.string().min(1).max(500).required(),
            status: yup.string().oneOf<MessageStatus>(['sent', 'received', 'viewed']).required(),
            sentAt: yup.date().required(),
            receivedAt: yup.date().notRequired(),
            viewedAt: yup.date().notRequired(),
        }),
    );

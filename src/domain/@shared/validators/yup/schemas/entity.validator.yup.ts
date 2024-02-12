import { EntityPropsType } from '@/domain/@shared/entities/types';
import * as yup from 'yup';

export const EntityYupSchema: yup.ObjectSchema<EntityPropsType> = yup
    .object()
    .shape({
        id: yup.string().uuid().required(),
        createdAt: yup.date().required(),
        updatedAt: yup
            .date()
            .when('createdAt', (createdAt, schema) => {
                if (!createdAt[0]) return schema;
                return schema.min(
                    createdAt,
                    'updatedAt must be after createdAt',
                );
            })
            .required(),
        deletedAt: yup
            .date()
            .when('createdAt', (createdAt, schema) => {
                if (!createdAt[0]) return schema;
                return schema.min(
                    createdAt,
                    'deletedAt must be after createdAt',
                );
            })
            .notRequired(),
    });
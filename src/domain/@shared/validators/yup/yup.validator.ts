import { Entity } from '@/domain/@shared/entities/entity.abstract';
import { ValueObject } from '../../entities/value-objects/value-object.abstract';
import {
    DomainValidationException,
    ValueObjectValidationException,
} from '@/domain/@shared/exceptions';
import * as yup from 'yup';


/**
 * Yup Validator class.
 * @description This class is used to represent a validator of the application.
 */
export abstract class YupValidator {
    /**
     * Executor.
     * @description This method is used to run the validation for entity, if invalid adds the errors to the entity notification.
     * @param entity Entity to be validated.
     * @param schema Schema to be used for validation.
     */
    protected run<T extends Entity<unknown>>(
        entity: T,
        schema: yup.Schema,
    ): void;

    /**
     * Executor.
     * @description This method is used to run the validation for value object, if invalid throws an exception.
     * @param valueObject Value object to be validated.
     * @param schema Schema to be used for validation.
     * @throws {ValueObjectValidationException} If the validation fails.
     */
    protected run<T extends ValueObject<unknown>>(
        valueObject: T,
        schema: yup.Schema,
    ): void;

    /**
     * Executor.
     * @description This method is used to run the validation for entity or value object.
     * @param object Entity or value object to be validated.
     * @param schema Schema to be used for validation.
     */
    protected run(
        object: Entity<unknown> | ValueObject<unknown>,
        schema: yup.Schema,
    ): void {
        // If the object is an entity, run the domain validator, otherwise run the value object validator.
        object instanceof Entity
            ? this.domainValidator(object, schema)
            : this.valueObjectValidator(object, schema);
    }

    /**
     * Domain validator.
     * @description This method is used to run the validation for entity, if invalid adds the errors to the entity notification.
     * @param entity Entity to be validated.
     * @param schema Schema to be used for validation.
     */
    private domainValidator<T extends Entity<unknown>>(
        entity: T,
        schema: yup.Schema,
    ): void {
        try {
            schema.validateSync(entity, { abortEarly: false });
        } catch (e) {
            const exception = e as yup.ValidationError;

            if (exception) {
                entity.addError(
                    new DomainValidationException(
                        exception.errors.join('; '),
                        exception.stack,
                    ),
                );
            }
        }
    }

    /**
     * Value Object validator.
     * @description This method is used to run the validation for value object, if invalid throws an exception.
     * @param valueObject Value object to be validated.
     * @param schema Schema to be used for validation.
     * @throws {ValueObjectValidationException} If the validation fails.
     */
    private valueObjectValidator<T extends ValueObject<unknown>>(
        valueObject: T,
        schema: yup.Schema,
    ): void {
        try {
            schema.validateSync(valueObject, { abortEarly: false });
        } catch (e) {
            const exception = e as yup.ValidationError;
            const message = exception.errors.join('; ');

            throw new ValueObjectValidationException(message, exception.stack);
        }
    }
}
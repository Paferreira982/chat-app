/**
 * Validator interface.
 * @description This interface is used to represent a validator of the application.
 * @type T Entity type.
 */
export interface ValidatorInterface<T> {
    /**
     * Validator.
     * @description This method is used to validate the entity.
     * @param entity Entity to be validated.
     * @type T Entity type.
     */
    validate(entity: T): void;
}
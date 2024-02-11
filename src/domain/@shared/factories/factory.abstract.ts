import { ValidatorInterface } from "../validators/validator.interface";

/**
 * Validator factory abstract class.
 * @description This class is used to represent a validator factory of the application.
 * @type T Type of the validator to be built.
 */
export abstract class ValidatorFactory<T> {
    /**
     * Validator builder.
     * @description This method is used to build a validator.
     * @type T Type of the validator to be built.
     * @returns A validator from the specified type <T>.
     */
    abstract build(): ValidatorInterface<T>;
}
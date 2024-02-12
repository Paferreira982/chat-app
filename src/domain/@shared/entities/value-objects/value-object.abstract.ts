import { ValidatorFactory } from '../../factories/factory.abstract';

/**
 * Value object abstract class.
 * @description This class is used to represent a value object of the application.
 * @template T Type of the value object properties.
 * @abstract
 */
export abstract class ValueObject<T> {
    private _domain: string;
    protected props: T;

    /**
     * Value object constructor.
     * @description This constructor is used when the value object is in the shared domain.
     * This method automatically runs the validation of the value object.
     * @param domain Domain of the value object.
     * @param props Properties of the value object.
     */
    protected constructor(domain: string, props: T);

    /**
     * Value object constructor.
     * @description This constructor is used when the value object is in the shared domain.
     * This method automatically runs the validation of the value object.
     * @param props Properties of the value object.
     */
    protected constructor(props: T);

    /**
     * Value object constructor.
     * @description This constructor is used when the value object is in the shared domain.
     * This method automatically runs the validation of the value object.
     * @param arg1 Domain of the value object or properties of the value object.
     * @param arg2 Properties of the value object.
     */
    protected constructor(arg1: string | T, arg2?: T) {
        this._domain =
            typeof arg1 === 'string' ? arg1.toLowerCase() : '@shared';

        this.props = typeof arg1 === 'string' ? arg2! : arg1;
        this.validate();
    }

    /**
     * Validator.
     * @description This method is used to validate the value object.
     * @fileoverview This method automatically calls the validator factory for the respective value object.
     * @throws {Exception} If the validator factory for the value object has not been implemented.
     */
    protected validate() {
        const valueObjectName = this.constructor.name
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase();

        try {
            const filePath = `@/domain/${this._domain}/factories/${valueObjectName}.validator.factory`;

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const factory = require(filePath).default as ValidatorFactory<this>;

            factory.build().validate(this);
        } catch (error) {
            if ((error as Error).message.includes('Could not locate module')) {
                throw new Error(
                    `Validator factory for value-object '${valueObjectName}' in the '${this._domain}' domain has not been implemented. Please ensure that there is a factory file located in the '/factories' directory within the '${this._domain}' domain context. Additionally, check if the file '${valueObjectName}.validator.factory.ts' exists within the same directory.`,
                );
            }

            throw error;
        }
    }
}
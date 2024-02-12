import { Exception } from './exception';
import { ValueObjectException } from './value-object.exception';

/**
 * Value object validation exception class.
 * @description This exception is used to represent validation errors that occur in the value object layer.
 * @extends ValueObjectException
 */
export class ValueObjectValidationException extends ValueObjectException {
    /**
     * Value object validation exception constructor.
     * @param message Message of the exception.
     * @param stack Stack trace of the exception.
     * @param subContext Sub-context of the exception.
     */
    public constructor(message?: string, stack?: string, subContext?: string) {
        const context = Exception.generateContext('validation', subContext || "");

        super(message, stack, context);
        this.name = 'ValueObjectValidationException';
    }
}
import { DomainException } from './domain.exception';
import { Exception } from './exception';

/**
 * Value object exception class.
 * @description This exception is used to represent errors that occur in the value object layer with general purpose.
 * @extends DomainException
 */
export class ValueObjectException extends DomainException {
    /**
     * Value object exception constructor.
     * @param message Message of the exception.
     * @param stack Stack trace of the exception.
     * @param subContext Sub-context of the exception.
     */
    public constructor(message?: string, stack?: string, subContext?: string) {
        const context = Exception.generateContext('value-object', subContext || "");

        super(message, stack, context);
        this.name = 'ValueObjectException';
    }
}
import { DomainException } from './domain.exception';
import { Exception } from './exception';

/**
 * Domain validation exception class.
 * @description This exception is used to represent validation errors that occur in the domain layer.
 * @extends DomainException
 */
export class DomainValidationException extends DomainException {
    /**
     * Domain validation exception constructor.
     * @param message Message of the exception.
     * @param stack Stack trace of the exception.
     * @param subContext Sub-context of the exception.
     */
    public constructor(message?: string, stack?: string, subContext?: string) {
        const context = Exception.generateContext('validation', subContext || '');

        super(message, stack, context);
        this.name = 'DomainValidationException';
    }
}
import { Exception } from './exception';

/**
 * Domain exception class.
 * @description This exception is used to represent errors that occur in the domain layer with general purpose.
 * @extends Exception
 */
export class DomainException extends Exception {
    /**
     * Domain exception constructor.
     * @param message Message of the exception.
     * @param stack Stack trace of the exception.
     * @param subContext Sub-context of the exception.
     */
    public constructor(message?: string, stack?: string, subContext?: string) {
        const context = Exception.generateContext('domain', subContext || '');

        super(message, stack, context);
        this.name = 'DomainException';
    }
}
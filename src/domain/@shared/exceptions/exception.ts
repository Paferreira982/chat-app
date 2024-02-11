/**
 * Exception base class.
 * @description This exception is used to represent errors that occur in the application with general purpose.
 * @extends Error
 */
export class Exception extends Error {
    private _context: string;

    /**
     * Exception constructor.
     * @param message Message of the exception.
     * @param stack Stack trace of the exception.
     * @param context Context of the exception.
     */
    public constructor(message?: string, stack?: string, context?: string) {
        super(message);
        this._context = context || '';

        this.name = 'Exception';
        this.stack = stack;
    }

    /**
     * Stack trace updater.
     * @description This method is used to update the stack trace of the exception to include the name of the exception.
     */
    private updateStack(): void {
        if (this.stack) {
            const stack = this.stack.split('\n');
            stack[0] = `[${this.name}] ${this.message}`;
            this.stack = stack.join('\n');
        }
    }

    /**
     * Exception context generator.
     * @description This method is used to generate the context of the exception.
     * @param context Context of the exception.
     * @param subContext Sub-context of the exception.
     * @returns The update context of the exception.
     * @static This method is static.
     */
    protected static generateContext(
        context: string,
        subContext: string,
    ): string {
        subContext = subContext ? `.${subContext}` : '';
        return context + subContext;
    }

    public get context() {
        return this._context;
    }
}
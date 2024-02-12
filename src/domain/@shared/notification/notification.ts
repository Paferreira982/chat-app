import { DomainException } from '../exceptions/domain.exception';
import { Exception } from '../exceptions';

/**
 * Notification class.
 * @description This class is used to represent the notification of an Entity.
 */
export class Notification {
    private notifications: Exception[] = [];

    /**
     * Add error.
     * @description This method is used to add an error to the notification.
     * @param error Error to be added to the notification.
     */
    public addError<T extends Exception>(error: T) {
        if (error) {
            this.notifications.push(error);
        } else {
            this.notifications.push(new Exception('Undefined error'));
        }
    }

    /**
     * Error checker.
     * @description This method is used to check if the notification has errors.
     * @returns {boolean} True if the notification has errors, false otherwise.
     */
    public hasErrors(): boolean {
        return this.notifications.length > 0;
    }

    /**
     * Filter.
     * @description This method is used to filter the notifications by context.
     * @param contextFilter Context to be filtered.
     * @returns The filtered notifications.
     */
    private filter(contextFilter?: string): Exception[] {
        return this.notifications.filter(
            (notification) =>
                contextFilter === undefined ||
                notification.context.startsWith(contextFilter),
        );
    }

    /**
     * Throw all notifications if any.
     * @description This method is used to throw all notifications if there are any.
     * @param context Context to be filtered.
     * @throws {DomainException} If the notification has errors.
     */
    public throwAllNotificationsIfAny(context?: string): void {
        if (!this.hasErrors()) {
            return;
        }

        const notifications = this.filter(context);

        let stack = '';

        notifications.forEach((notification, i) => {
            stack += `\n${i + 1}. [${notification.name}] ${
                notification.context
            }: ${notification.message} \n`;

            // Remove the first line and add the custom error to the stack instead of the original.
            stack += `${notification.stack
                ?.split('\n')
                .slice(1)
                .join('\n')}. \n`;
        });

        stack += `----------------------------------------- \n`;
        stack += `Total errors: ${notifications.length}\n`;
        stack += `----------------------------------------- \n`;

        const message = `${notifications
            .map((notification) => notification.message)
            .join(';')};`;

        throw new DomainException(message, stack, 'notification');
    }
}
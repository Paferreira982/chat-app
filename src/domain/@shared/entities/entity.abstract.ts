import { Notification } from "../notification/notification";
import { EntityPropsType, EntityConstructorDto } from "./types";
import { Exception } from "../exceptions";
import { ValidatorFactory } from "../factories/factory.abstract";

/**
 * Entity abstract class.
 * @description This class is used to represent an entity of the application.
 * @template T Type of the entity properties.
 * @abstract
 */
export class Entity<T> {
    private _id: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _deletedAt: Date | null | undefined;
    private _domain: string;
    private _notification: Notification;

    protected props: T;

    /**
     * Entity constructor.
     * @description Constructor of the entity. This method automatically runs the validation of the entity.
     * @param domain Domain of the entity.
     * @param id Id of the entity.
     * @param createdAt Date of creation of the entity.
     * @param updatedAt Date of the last update of the entity.
     * @param deletedAt Date of the deletion of the entity.
     * @param props Properties of the entity.
     */
    protected constructor(
        domain: string,
        { id, createdAt, updatedAt, deletedAt, props }: EntityConstructorDto<T>,
    ) {
        this._id = id;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;

        this._domain = domain.toLowerCase();
        this._notification = new Notification();
        this.props = props;
        this.validate();
    }

    /**
     * Base properties generator.
     * @description This method is used to generate the base entity properties with default values.
     * @returns {EntityPropsType} with default values set.
     */
    protected static buildDefault(): EntityPropsType {
        return {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
    }

    // BUSINESS METHODS

    /**
     * Validator.
     * @description This method is used to validate the entity.
     * @fileoverview This method automatically calls the validator factory for the respective entity.
     * @throws {Error} If the validator factory for the entity has not been implemented.
     */
    protected validate() {
        const entityName = this.constructor.name
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .toLowerCase();

        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const factory = require(
                `@/domain/${this._domain}/factories/${entityName}.validator.factory`,
            ).default as ValidatorFactory<this>;

            factory.build().validate(this);
            if (this._notification.hasErrors()) {
                this._notification.throwAllNotificationsIfAny();
            }
        } catch (error) {
            if ((error as Error).message.includes('Could not locate module')) {
                throw new Error(
                    `Validator factory for entity '${entityName}' in the '${this._domain}' domain has not been implemented. Please ensure that there is a factory file located in the '/factories' directory within the '${this._domain}' domain context. Additionally, check if the file '${entityName}.validator.factory.ts' exists within the same directory.`,
                );
            }

            throw error;
        }
    }

    /**
     * Deleter.
     * @description This method is used to delete the entity. Sets the deletedAt property to the current date.
     */
    public delete() {
        this._deletedAt = new Date();
    }

    /**
     * Add error.
     * @description This method is used to add an error to the entity notification.
     * @param notification Error to be added to the entity notification.
     * @type {T} Type of the error to be added to the entity notification.
     */
    public addError<T extends Exception>(notification: T) {
        this._notification.addError(notification);
    }

    /**
     * Error checker.
     * @description This method is used to check if the entity has errors.
     * @returns {boolean} True if the entity has errors, false otherwise.
     */
    public hasErrors(): boolean {
        return this._notification.hasErrors();
    }

    /**
     * Throw all notifications if any.
     * @description This method is used to throw all notifications of the entity if there are any.
     * @throws {DomainException} If the entity has errors.
     */
    public throwAllNotificationsIfAny() {
        this._notification.throwAllNotificationsIfAny();
    }

    // GET & SETTERS
    protected set updatedAt(aDate: Date) {
        this._updatedAt = aDate;
    }

    protected set deletedAt(aDate: Date) {
        this._deletedAt = aDate;
    }

    public get id(): string {
        return this._id;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public get deletedAt(): Date | undefined | null {
        return this._deletedAt;
    }

    public entityChanged() {
        this.updatedAt = new Date();
    }
}
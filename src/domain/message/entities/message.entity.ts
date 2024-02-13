import { Entity } from "@/domain/@shared/entities/entity.abstract";
import { MessagePropsType, MessageEntityPropsType } from "./types";

export class Message extends Entity<MessagePropsType> {
    private constructor({
        id,
        origin,
        destination,
        content,
        status,
        sentAt,
        receivedAt,
        viewedAt,
        createdAt,
        updatedAt,
        deletedAt,
    }: MessageEntityPropsType) {
        const props = { origin, destination, content, status, sentAt, receivedAt, viewedAt };
        super('Message', { id, createdAt, deletedAt, updatedAt, props });
    }

    public static build({
        origin,
        destination,
        content,
        status,
        sentAt,
        receivedAt,
        viewedAt,
    }: MessagePropsType): Message {
        return new Message({
            ...Entity.buildDefault(),
            origin,
            destination,
            content,
            status,
            sentAt,
            receivedAt,
            viewedAt,
        });
    }

    // GETTERS & SETTERS
    public get origin(): string {
        return this.props.origin;
    }

    public get destination(): string {
        return this.props.destination;
    }

    public get content(): string {
        return this.props.content;
    }

    public get status(): string {
        return this.props.status;
    }

    public get sentAt(): Date {
        return this.props.sentAt;
    }

    public get receivedAt(): Date {
        return this.props.receivedAt;
    }

    public get viewedAt(): Date {
        return this.props.viewedAt;
    }
}
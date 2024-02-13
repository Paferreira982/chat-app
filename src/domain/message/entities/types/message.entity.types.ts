import { EntityPropsType } from "@/domain/@shared/entities/types";

export type MessageStatus = 'sent' | 'received' | 'viewed';

export type MessagePropsType = {
    content: string;
    status: MessageStatus;
    origin: string;
    destination: string;
    sentAt: Date;
    receivedAt: Date;
    viewedAt: Date;
}

export type MessageEntityPropsType = MessagePropsType & EntityPropsType;

import { Message, MessageStatus } from '@/contexts/MessageContext';
import { CheckCheckIcon, CheckIcon } from 'lucide-react';
import WebSocketServer from "@/services/websocket/socket.io";

interface MessageListProps {
  messages: Message[] | undefined;
  destination: string;
  loggedUserId: string | undefined;
}

const MessageBox: React.FC<MessageListProps> = ({ messages = [], destination, loggedUserId="" }) => {

    const uniqueIds: Record<string, boolean> = {};
    messages = messages.filter((message) => {
        return uniqueIds.hasOwnProperty(message.id) ? false : (uniqueIds[message.id] = true)
        && (message.origin === loggedUserId || message.destination === loggedUserId);
    });

    messages.sort((a, b) => a.timestamp - b.timestamp);

    messages.forEach((message) => {
        if (message.destination === destination || message.status === 'viewed') return;
        message.status = 'viewed';
        WebSocketServer.emit('message:status:update', message);
    });

    const renderMessageStatusIcon = (status: MessageStatus) => {
        switch (status) {
        case 'sent':
            return <CheckIcon className="text-xs" />;
        case 'viewed':
            return <CheckCheckIcon className='text-xs text-blue-500' />;
        default:
            return <CheckCheckIcon className="text-xs" />;
        }
    };

    return (
        <div className="flex flex-col space-y-2 p-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex flex-col ${
                        message.destination === destination ? 'items-end' : 'items-start'}`}>
                    <div className={`bg-gray-200 p-2 rounded-lg relative ${
                        message.origin === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                    }`}>
                        <span className='pr-1 pl-1'>
                            {message.content}
                        </span>

                        <div>
                            <span className="text-xs text-gray-500 mt-1 flex justify-end">
                                <span className={`mr-2 ${message.destination === destination ? "mt-2" : ""}`}>
                                    {new Date(message.timestamp).toDateString()}
                                </span>
                                {message.destination === destination ? 
                                    <span className='text-xs' >{renderMessageStatusIcon(message.status)}</span> 
                                    : ""
                                }
                            </span>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
};

export default MessageBox;

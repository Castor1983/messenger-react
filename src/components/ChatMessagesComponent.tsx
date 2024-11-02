import React, { useEffect, useRef } from 'react';
import { IMessageResponse } from '../types/messageType';
import { toDate } from '../utils/dateUtils';

interface MessageListProps {
    messages: IMessageResponse[];
    payloadUserId: string;
    selectedMessageId: string | null;
    onClickMessage: (id: string) => void;
    onEditMessage: (messageId: string, receiverId: string, senderId: string) => void;
    onDeleteMessage: (messageId: string, receiverId: string, senderId: string) => void;
}

const ChatMessagesComponent: React.FC<MessageListProps> = ({
                                                     messages,
                                                     payloadUserId,
                                                     selectedMessageId,
                                                     onClickMessage,
                                                     onEditMessage,
                                                     onDeleteMessage
                                                 }) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '20px' }}>
            {messages.map((msg) => (
                <div key={msg.id} onClick={() => onClickMessage(msg.id)} style={{
                    textAlign: msg.senderId === payloadUserId ? 'right' : 'left',
                    margin: '5px 0',
                    color: msg.senderId === payloadUserId ? '#007bff' : '#28a745',
                }}>
                    <strong>{msg.senderId}:</strong>
                    <p>{msg.message}</p>
                    <p>{toDate(msg.create)}</p>

                    {msg.senderId === payloadUserId && selectedMessageId === msg.id && (
                        <div>
                            <button onClick={() => onEditMessage(msg.id, msg.receiverId, msg.senderId)}>
                                Edit
                            </button>
                            <button onClick={() => onDeleteMessage(msg.id, msg.receiverId, msg.senderId)} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                        </div>
                    )}

                    {msg.files.length > 0 && (
                        <div>
                            <strong>Attached files:</strong>
                            <ul>
                                {msg.files.map((fileUrl, index) => (
                                    <li key={index}>
                                        <a href={fileUrl} target="_blank" rel="noopener noreferrer">{`File ${index + 1}`}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export {ChatMessagesComponent};

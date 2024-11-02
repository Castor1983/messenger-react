import React, {useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { requestServices } from '../services/api.service';
import { jwtDecode } from 'jwt-decode';
import { ITokenPayload } from '../types/tokenType';
import {LoaderComponent} from './LoaderComponent'
import {ChatFormInputs, createType } from '../types/messageType';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../router/appRoutes';
import { useFirestoreCollection } from '../customHooks/useFirestoreCollection';

const ChatFormComponent: React.FC = () => {
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, reset, setValue } = useForm<ChatFormInputs>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [collectionName, setCollectionName] = useState<string | null>(null);
    const messages = useFirestoreCollection(collectionName ?? '');
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const token = sessionStorage.getItem('token');
    const payload: ITokenPayload = token ? jwtDecode(token) : { userId: '' };

    const toDate = (timestamp: createType) => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
        return date.toLocaleString()
    }

    const onSubmit: SubmitHandler<ChatFormInputs> = async (data ) => {
        setIsLoading(true);
        const formData = new FormData();
        if (token) {
            formData.append("senderId", payload.userId)
            formData.append("receiverId", data.receiverId);
            formData.append("message", data.message);
            Array.from(data.files).forEach((file) => {
                formData.append("files", file);
            });
        }
        const chatId: string = [payload.userId, data.receiverId].sort().join('_');
        setCollectionName(`chats/${chatId}/messages`);

        try {
            await requestServices.chatService.sendMassage(formData)
            reset({message: '',
                files: new DataTransfer().files});
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }

    };

    const handleClickMessage = (id: string) => {
        setSelectedMessageId(prevId => (prevId === id ? null : id));
        console.log(selectedMessageId)
    };

    const handleEditMessage = async (messageId: string, receiverId: string, senderId: string) => {
        const chatId: string = [senderId, receiverId].sort().join('_');
        const messageToEdit =await requestServices.chatService.getMessageById( chatId, messageId)
        if (messageToEdit) {
            setValue("message", messageToEdit.message);
            setValue("receiverId", messageToEdit.receiverId);
            setIsEditing(messageId);
        }
    };

    const handleUpdateMessage: SubmitHandler<ChatFormInputs> = async (data) => {
        setIsLoading(true);
        const { files, ...dataWithoutFiles } = data;
        const chatId: string = [payload.userId, data.receiverId].sort().join('_');
        await requestServices.chatService.editMassage(dataWithoutFiles, isEditing as string, chatId)
        reset();
        setIsEditing(null);
        setIsLoading(false);
    };

    const handleDeleteMessage = async (messageId: string, receiverId: string, senderId: string) => {
        setIsLoading(true);
        const chatId: string = [senderId, receiverId].sort().join('_');

        await requestServices.chatService.deleteMassage(messageId, chatId)
        setIsLoading(false);
    };

    return (
        <>
            {token? (<div style={{maxWidth: '900px', margin: '0 auto'}}>
                <h1>Chat</h1>
                {isLoading ? (
                    <LoaderComponent/>
                ) : (
                    <div style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        height: '300px',
                        overflowY: 'scroll',
                        marginBottom: '20px'
                    }}>
                        {messages.map((msg) => (
                            <div key={msg.id} onClick={() => handleClickMessage(msg.id)} style={{
                                textAlign: msg.senderId === payload.userId ? 'right' : 'left',
                                margin: '5px 0',
                                color: msg.senderId === payload.userId ? '#007bff' : '#28a745',
                            }}>
                                <strong>{msg.senderId}:</strong>
                                <p>{msg.message}</p>
                                <p>{toDate(msg.create)}</p>

                                {msg.senderId === payload.userId && selectedMessageId === msg.id && (
                                    <div>
                                        <button
                                            onClick={() => handleEditMessage(msg.id, msg.receiverId, msg.senderId)}>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMessage(msg.id, msg.receiverId, msg.senderId)}
                                            style={{marginLeft: '10px'}}>
                                            Delete
                                        </button>
                                    </div>
                                )}

                                {msg.files.length > 0 && (
                                    <div>
                                        <strong>Attached files:</strong>
                                        <ul>
                                            {msg.files.map((fileUrl, index) => {

                                                return (
                                                    <li key={index}>
                                                        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                                            {`File ${index + 1}`}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                            </div>

                        ))}
                        <div ref={messagesEndRef}/>
                    </div>)}

                <form className='chatInputForm' onSubmit={handleSubmit(isEditing ? handleUpdateMessage : onSubmit)}>
                    <label htmlFor="recipient">Receiver:</label>
                    <input id="receiverId" {...register("receiverId", {required: "Specify the receiver",  pattern: {
                            value: /^0\d{9}$/,
                            message: 'The phone number must start with 0 and have 10 digits',
                        }})} />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" {...register("message", {required: "Enter a message"})}></textarea>
                    {!isEditing && <div><label htmlFor="files">Add files:</label>
                        <input id="files" type="file" {...register("files")} multiple/>
                    </div>}

                    <button type="submit">{isEditing ? "Update" : "Send"}</button>
                </form>
            </div>) : (
                <Navigate to={appRoutes.AUTH} />
            )
            } </>
    );
};

export {ChatFormComponent};

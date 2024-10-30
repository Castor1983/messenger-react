import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { requestServices } from '../services/api.service';
import { jwtDecode } from 'jwt-decode';
import { ITokenPayload } from '../types/tokenType';
import {ChatFormInputs, IMessage } from '../types/messageType';


const ChatForm: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { register, handleSubmit, reset } = useForm<ChatFormInputs>();


    const onSubmit: SubmitHandler<ChatFormInputs> = async (data ) => {
        const token = sessionStorage.getItem('token');

        if (token) {
            const formData = new FormData();
            const payload: ITokenPayload   = jwtDecode(token);
            formData.append("senderId", payload.userId)
            formData.append("receiverId", data.receiverId);
            formData.append("message", data.message);
            Array.from(data.files).forEach((file) => {
                formData.append("files", file);
            });

            try {
               await requestServices.chatService.sendMassage(formData)

                const newMessage: IMessage = {
                    senderId: payload.userId,
                    receiverId: data.receiverId,
                    message: data.message,
                    files: Array.from(data.files),
                };

                setMessages((prevMessages) => [...prevMessages, newMessage]);
                reset();
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Chat</h1>

            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '20px' }}>
                {messages.map((msg, index) => (
                    <div   key={index} style={{
                        textAlign: msg.senderId === 'user' ? 'right' : 'left',
                        margin: '5px 0',
                        color: msg.senderId === 'user' ? '#007bff' : '#28a745',
                    }}>
                        <strong>{msg.senderId} → {msg.receiverId}:</strong>
                        <p>{msg.message}</p>
                        {msg.files.length > 0 && (
                            <div>
                                <strong>Attached files:</strong>
                                <ul>
                                    {msg.files.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="recipient">Receiver:</label>
                <input id="receiverId" {...register("receiverId", { required: "Вкажіть отримувача" })} />

                <label htmlFor="message">Message:</label>
                <textarea id="message" {...register("message", { required: "Введіть повідомлення" })}></textarea>

                <label htmlFor="files">Add files:</label>
                <input id="files" type="file" {...register("files")} multiple />

                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export {ChatForm};

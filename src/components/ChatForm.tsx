import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface ChatFormInputs {
    message: string;
}

const ChatForm: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<ChatFormInputs>();
    const [messages, setMessages] = useState<Message[]>([]);

    const onSubmit: SubmitHandler<ChatFormInputs> = ({ message }) => {

        const newMessage: Message = { text: message, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        
        const botReply: Message = {
            text: `You say: ${message}`,
            sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);

        reset();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', height: '300px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.sender === 'user' ? 'right' : 'left',
                            margin: '5px 0',
                            color: msg.sender === 'user' ? '#007bff' : '#28a745',
                        }}
                    >
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex' }}>
                <input
                    {...register('message', { required: true })}
                    placeholder="Enter a message"
                    style={{ flex: 1, padding: '8px', marginRight: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '8px 12px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
                    Send message
                </button>
            </form>
        </div>
    );
};
export {ChatForm};

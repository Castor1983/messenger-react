import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChatFormInputs } from '../types/messageType';

interface MessageFormProps {
    onSubmit: SubmitHandler<ChatFormInputs>;
    isEditing: string | null;
}

const ChatInputComponent: React.FC<MessageFormProps> = ({ onSubmit, isEditing }) => {
    const { register, handleSubmit, reset } = useForm<ChatFormInputs>();

    return (
        <form className="chatInputForm" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="recipient">Receiver:</label>
            <input id="receiverId" {...register("receiverId", {
                required: "Specify the receiver",
                pattern: { value: /^0\d{9}$/, message: 'The phone number must start with 0 and have 10 digits' }
            })} />

            <label htmlFor="message">Message:</label>
            <textarea id="message" {...register("message", { required: "Enter a message" })}></textarea>

            {!isEditing && (
                <div>
                    <label htmlFor="files">Add files:</label>
                    <input id="files" type="file" {...register("files")} multiple />
                </div>
            )}

            <button type="submit">{isEditing ? "Update" : "Send"}</button>
        </form>
    );
};

export {ChatInputComponent};

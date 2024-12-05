
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler,useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import css from './ChatForm.module.css';
import '../index.module.css';
import { useFirestoreCollection } from '../../customHooks/useFirestoreCollection';
import { appRoutes } from '../../router/appRoutes';
import { requestServices } from '../../services/api.service';
import { ChatFormInputs } from '../../types/messageType';
import { ITokenPayload } from '../../types/tokenType';
import { toDate } from '../../utils/dateUtils';
import { LoaderComponent } from '../loaderComponent/LoaderComponent';
import { phonePattern } from '../../constants/patterns';

const ChatFormComponent: React.FC = () => {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ChatFormInputs>();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messages = useFirestoreCollection(collectionName ?? '');
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const token = sessionStorage.getItem('token');
  const payload: ITokenPayload = token ? jwtDecode(token) : { userId: '' };

  const onSubmit: SubmitHandler<ChatFormInputs> = async (data ) => {
    setIsLoading(true);
    const formData = new FormData();
    if (token) {
      formData.append('senderId', payload.userId);
      formData.append('receiverId', data.receiverId);
      formData.append('message', data.message);
      Array.from(data.files).forEach((file) => {
        formData.append('files', file);
      });
    }
    const chatId: string = [payload.userId, data.receiverId].sort().join('_');
    setCollectionName(`chats/${chatId}/messages`);

    try {
      await requestServices.chatService.sendMassage(formData);
      reset({ message: '',
        files: new DataTransfer().files });
      setError(null);
      setIsLoading(false);
    } catch (error: any) {

      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }

  };

  const handleClickMessage = (id: string) => {
    setSelectedMessageId(prevId => (prevId === id ? null : id));
  };

  const handleEditMessage = async (messageId: string, receiverId: string, senderId: string) => {
    const chatId: string = [senderId, receiverId].sort().join('_');
    const messageToEdit =await requestServices.chatService.getMessageById( chatId, messageId);
    if (messageToEdit) {
      setValue('message', messageToEdit.message);
      setValue('receiverId', messageToEdit.receiverId);
      setIsEditing(messageId);
    }
  };

  const handleUpdateMessage: SubmitHandler<ChatFormInputs> = async (data) => {
    setIsLoading(true);
    const {files, ...dataWithoutFiles } = data;
    const chatId: string = [payload.userId, data.receiverId].sort().join('_');
    await requestServices.chatService.editMassage(dataWithoutFiles, isEditing as string, chatId);
    reset();
    setIsEditing(null);
    setIsLoading(false);
  };

  const handleDeleteMessage = async (messageId: string, receiverId: string, senderId: string) => {
    setIsLoading(true);
    const chatId: string = [senderId, receiverId].sort().join('_');

    await requestServices.chatService.deleteMassage(messageId, chatId);
    setIsLoading(false);
  };

  return (
    <>
      { token? (<div style={ { maxWidth: '900px', margin: '0 auto' } }>
        <h1>Chat</h1>
        { isLoading ? (
          <LoaderComponent/>
        ) : (
          <div className={ css.chatFormContainer }>
            { messages.map((msg) => (
              <div className={ msg.senderId === payload.userId ? css.rightAligned : css.leftAligned }
                key={ msg.id } onClick={ () => handleClickMessage(msg.id) }
              >
                <strong>{ msg.senderId }:</strong>
                <p>{ msg.message }</p>
                <p>{ toDate(msg.create) }</p>

                { msg.senderId === payload.userId && selectedMessageId === msg.id && (
                  <div>
                    <button
                      onClick={ () => handleEditMessage(msg.id, msg.receiverId, msg.senderId) }
                    >
                      Edit
                    </button>
                    <button
                      onClick={ () => handleDeleteMessage(msg.id, msg.receiverId, msg.senderId) }
                      style={ { marginLeft: '10px' } }
                    >
                      Delete
                    </button>
                  </div>
                ) }

                { msg.files.length > 0 && (
                  <div>
                    <strong>Attached files:</strong>
                    <ul>
                      { msg.files.map((fileUrl, index) => {

                        return (
                          <li key={ index }>
                            <a href={ fileUrl } target="_blank" rel="noopener noreferrer">
                              { `File ${index + 1}` }
                            </a>
                          </li>
                        );
                      }) }
                    </ul>
                  </div>
                ) }

              </div>

            )) }
            <div ref={ messagesEndRef }/>
          </div>) }

        <form className={ css.chatInputForm } onSubmit={ handleSubmit(isEditing ? handleUpdateMessage : onSubmit) }>
          <label htmlFor="recipient">Receiver:</label>
          <input id="receiverId" { ...register('receiverId', { required: 'Specify the receiver',  pattern: phonePattern
           }) }
          />
          { errors.receiverId && <p>{ errors.receiverId.message }</p> }

          <label htmlFor="message">Message:</label>
          <textarea id="message" { ...register('message', { required: 'Enter a message' }) } />
          { errors.message && <p>{ errors.message.message }</p> }
          { !isEditing && <div><label htmlFor="files">Add files:</label>
            <input id="files" type="file" { ...register('files') } multiple/>
          </div> }

          <button type="submit">{ isEditing ? 'Update' : 'Send' }</button>
          { error && <p>{ error }</p> }
        </form>

      </div>) : (
        <Navigate to={ appRoutes.AUTH } />
      )
      } </>
  );
};

export { ChatFormComponent };

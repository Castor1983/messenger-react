import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { baseUrl, urls } from '../constants/urls';
import { IMessageResponse, IUpdateMessage } from '../types/messageType';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export const requestServices = {

  chatService: {

    sendMassage: async (FormData: FormData): Promise<void> => {
      const token = sessionStorage.getItem('token');
      const response: AxiosResponse<void> = await axiosInstance.post<void>(urls.chat.sendMassage, FormData, { headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }, });
      return response.data;
    },

    getMessagesByChatId: async (chatId: string): Promise<IMessageResponse[]> => {
      const token = sessionStorage.getItem('token');
      const response: AxiosResponse<IMessageResponse[]> = await axiosInstance.get<IMessageResponse[]>(`${urls.chat.getMessagesByChatId}/${chatId}`, {  headers: {
        Authorization: `Bearer ${token}`,
      }, });
      return response.data;
    },

    getMessageById: async (chatId: string, messageId: string): Promise<IMessageResponse> => {
      const token = sessionStorage.getItem('token');
      const response: AxiosResponse<IMessageResponse> = await axiosInstance.get<IMessageResponse>(`${urls.chat.getMessageById}/${chatId}/${messageId}`, {  headers: {
        Authorization: `Bearer ${token}`,
      }, });
      return response.data;
    },

    deleteMassage: async (messageId: string, chatId: string): Promise<void> => {
      const token = sessionStorage.getItem('token');
      await axiosInstance.delete<void>(`${urls.chat.deleteMassage}/${chatId}/${messageId}`, {  headers: {
        Authorization: `Bearer ${token}`,
      }, } );
    },

    editMassage: async (data: IUpdateMessage, messageId: string, chatId: string): Promise<void> => {
      const token = sessionStorage.getItem('token');
      await axiosInstance.put<void>(`${urls.chat.editMassage}/${chatId}/${messageId}`, data, {  headers: {
        Authorization: `Bearer ${token}`,
      }, } );

    },
  }
};


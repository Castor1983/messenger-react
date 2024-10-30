import axios, {AxiosInstance, AxiosResponse } from "axios";

import { baseUrl, urls } from "../constants/urls";
import {IUserCredentials, IUserRegister} from "../types/userType";
import {IMessage, IMessageFormData} from "../types/messageType";
import { IToken } from "../types/tokenType";

 export const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
})

export const requestServices = {
    authService: {
        register: async (data: IUserRegister): Promise<void> => {
            await axiosInstance.post<void>(urls.auth.register, data)

        },
        login: async (data: IUserCredentials): Promise<IToken> => {
            const response = await axiosInstance.post<IToken>(urls.auth.login, data)
            return response.data


        },
        logout: async (): Promise<void> => {
            const response: AxiosResponse<void> = await axiosInstance.delete<void>(urls.auth.logout)

        },

    },
    chatService: {
        sendMassage: async (FormData: FormData): Promise<void> => {
            const token = sessionStorage.getItem("token");
            const response: AxiosResponse<void> = await axiosInstance.post<void>(urls.chat.sendMassage, FormData, { headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },})
            return response.data
        },
        getMessagesByChatId: async (chatId: string): Promise<IMessage[]> => {
            const token = sessionStorage.getItem("token");
            const response: AxiosResponse<IMessage[]> = await axiosInstance.get<IMessage[]>(`${urls.chat.getMessagesByChatId}/${chatId}`, {  headers: {
                    Authorization: `Bearer ${token}`,
                },})
            return response.data
        },
        /*editMassage: async (messageId: string, chatId: string): Promise<IResponseGenresListModel> => {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.put<IResponseGenresListModel>(urls.chat.editMassage, {messageId})
            return response.data
        },
        deleteMassage: async (messageId: string, chatId: string): Promise<IResponseGenresListModel> => {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.delete<IResponseGenresListModel>(urls.chat.deleteMassage, {messageId})
            return response.data
        },
        */

}
}


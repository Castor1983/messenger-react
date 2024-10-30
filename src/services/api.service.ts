import axios, {AxiosInstance, AxiosResponse } from "axios";

import { baseUrl, urls } from "../constants/urls";
import {IUserCredentials, IUserRegister} from "../types/userType";
import {IMessage} from "../types/messageType";
import { IToken } from "../types/tokenType";

 export const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
     headers: {'Content-type': 'application/json'}
})

export const requestServices = {
    authService:{
        register: async (data: IUserRegister):Promise<void>=> {
             await axiosInstance.post<void>(urls.auth.register, data)
            
        },
        login: async (data: IUserCredentials):Promise<IToken>=> {
            const response = await  axiosInstance.post<IToken>(urls.auth.login, data)
            return response.data


        },
        logout: async ():Promise<void>=> {
            const response: AxiosResponse<void> = await axiosInstance.delete<void>(urls.auth.logout)

        },

    },
    /*chatService:{
        sendMassage: async (dto: IMessage<FormData>):Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.post<IResponseGenresListModel>(urls.chat.sendMassage, {params: {language: 'en'}})
            return response.data
},
        editMassage: async (messageId: string, chatId: string):Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.put<IResponseGenresListModel>(urls.chat.editMassage, {messageId})
            return response.data
},
        deleteMassage: async (messageId: string, chatId: string):Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.delete<IResponseGenresListModel>(urls.chat.deleteMassage, {messageId})
            return response.data
},
        getMessagesByChatId: async (chatId: string):Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.get<IResponseGenresListModel>(urls.chat.getMessagesByChatId, {chatId})
            return response.data
},
*/
    }


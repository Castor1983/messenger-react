import axios, {AxiosInstance, AxiosResponse } from "axios";
import { baseUrl, urls } from "../constants/urls";
import {IUser, IUserCredentials} from "../types/userType";
import {IMessage} from "../types/messageType";

 export const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer token`
    },
})

export const requestServices = {
    authService:{
        register: async (dto: IUser):Promise<IResponseMoviesListModel>=> {
            const response: AxiosResponse<IResponseMoviesListModel> = await axiosInstance.post<IResponseMoviesListModel>(urls.auth.register)
            return response.data
        },
        login: async (dto: IUserCredentials):Promise<IMovieCardModel>=> {
            const response: AxiosResponse<IMovieCardModel> = await  axiosInstance.post<IMovieCardModel>(urls.auth.login)
            return response.data

        },
        logout: async ():Promise<IResponseMoviesListModel>=> {
            const response: AxiosResponse<IResponseMoviesListModel> = await axiosInstance.delete<IResponseMoviesListModel>(urls.auth.logout, {params: {with_genres: `${genreId}`, page: `${page}`}})
            return response.data
        },

    },
    chatService:{
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

    }
}

import axios, {AxiosInstance, AxiosResponse } from "axios";
import { baseUrl, urls } from "../constants/urls";
import { IResponseMoviesListModel } from "../models/IResponseMoviesListModel";
import { IMovieCardModel } from "../models/IMovieCardModel";
import { IResponseGenresListModel } from "../models/IResponseGenreListModel";

 export const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    },
})

export const requestServices = {
    authService:{
        register: async (dto: string):Promise<IResponseMoviesListModel>=> {
            const response: AxiosResponse<IResponseMoviesListModel> = await axiosInstance.get<IResponseMoviesListModel>(urls.movies.getAll, {params: {page: `${page}`}})
            return response.data
        },
        login: async (dto: string):Promise<IMovieCardModel>=> {
            const response: AxiosResponse<IMovieCardModel> = await  axiosInstance.get<IMovieCardModel>(urls.movies.getById(id))
            return response.data

        },
        logout: async ():Promise<IResponseMoviesListModel>=> {
            const response: AxiosResponse<IResponseMoviesListModel> = await axiosInstance.get<IResponseMoviesListModel>(urls.movies.getByGenre, {params: {with_genres: `${genreId}`, page: `${page}`}})
            return response.data
        },

    },
    chatService:{
        sendMassage: async ():Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.get<IResponseGenresListModel>(urls.genres.getAll, {params: {language: 'en'}})
            return response.data
},
        editMassage: async ():Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.get<IResponseGenresListModel>(urls.genres.getAll, {params: {language: 'en'}})
            return response.data
},
        deleteMassage: async ():Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.get<IResponseGenresListModel>(urls.genres.getAll, {params: {language: 'en'}})
            return response.data
},
        getMessagesByChatId: async ():Promise<IResponseGenresListModel>=> {
            const response: AxiosResponse<IResponseGenresListModel> = await axiosInstance.get<IResponseGenresListModel>(urls.genres.getAll, {params: {language: 'en'}})
            return response.data
},

    }
}

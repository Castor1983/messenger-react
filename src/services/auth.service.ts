import { axiosInstance } from './api.service';
import { urls } from '../constants/urls';
import { IToken } from '../types/tokenType';
import { IUserCredentials, IUserRegister } from '../types/userType';

export const authService = {

  register: async (data: IUserRegister): Promise<void> => {
    await axiosInstance.post<void>(urls.auth.register, data);
  },

  login: async (data: IUserCredentials): Promise<IToken> => {
    const response = await axiosInstance.post<IToken>(urls.auth.login, data);
    return response.data;
  },

  logout: async (token: string): Promise<void> => {
    await axiosInstance.delete<void>(urls.auth.logout, { headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }, });
  },
};

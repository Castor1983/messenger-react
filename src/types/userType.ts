
 export interface IUser {
     id: string;
     nickName: string;
     phone: string;
     password: string;

    }
 export type IUserRegister = Pick<IUser, "nickName"|"phone" | "password">;

 export type IUserCredentials = Pick<IUser, "phone" | "password">;


 export interface IUser {
     id: string;
     nickName: string;
     phone: string;
     password: string;

    }
 export type IUserCredentials = Pick<IUser, "phone" | "password">;

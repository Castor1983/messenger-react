import { ParamsDictionary } from 'express-serve-static-core';

export interface IMessage {
    senderId: string,
    receiverId: string,
    message: string,
    files: File[]


}
export type createType = {
    seconds: number,
    nanoseconds: number
}
export interface IMessageResponse {
    messageId: string,
    senderId: string,
    receiverId: string,
    message: string,
    create: createType,
    files: string[]


}

export interface IMessageFormData {
    senderId: FormData,
    receiverId: FormData,
    message: FormData,
    files?: FormData


}
export interface IUpdateMessage  {
    receiverId: string
    message: string,
}
export interface IMessageParams extends ParamsDictionary {
    chatId: string,
    messageId: string

}
export interface ChatFormInputs {
    receiverId: string;
    message: string;
    files:FileList;
}


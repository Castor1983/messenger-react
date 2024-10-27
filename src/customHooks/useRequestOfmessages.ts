import {useEffect, useState} from "react";
import {requestServices} from "../services/api.service";
import {IMessage} from "../types/messageType";

export const useRequestOfMessages = () =>{
    const [messages, setMessages] = useState<IMessage<string>[]>([])
    useEffect(() => {
requestServices.chatService.getMessagesByChatId(chatId).then(value => setMessages(value.data))
    }, []);
    return messages
}

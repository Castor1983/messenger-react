
const baseUrl =  'http://localhost:5001'
const register = '/auth/register';
const login = '/auth/login'
const logout = '/auth/logout'
const sendMassage = '/chat/send-message'
const editMassage = '/chat/edit-message/:chatId/:messageId'
const deleteMassage = '/chat/delete-message/:chatId/:messageId'
const messages = '/chat/messages/:chatId'

const urls = {
    auth:{
        register,
        login,
        logout
    },
    chat: {
        sendMassage,
        editMassage,
        deleteMassage,
        getMessagesByChatId: messages
    }
}
export {
    baseUrl,
    urls
}

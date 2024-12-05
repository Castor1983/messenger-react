
const baseUrl =  'http://localhost:5001';
const register = '/auth/register';
const login = '/auth/login';
const logout = '/auth/logout';
const sendMassage = '/chat/send-message';
const editMassage = '/chat/edit-message';
const deleteMassage = '/chat/delete-message';
const messages = '/chat/messages';

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
    getMessagesByChatId: messages,
    getMessageById: messages,
  }
};
export {
  baseUrl,
  urls
};

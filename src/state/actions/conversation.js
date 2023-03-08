import { BackendAPI } from '../../services';

export const addConversation = (conversation) => ({ type: 'ADD_CONVERSATION', payload: conversation });

export const fetchConversations = () => {
  const thunkFunction = async (dispatch, getState) => {
    BackendAPI.allConversations().then((response) => {
      dispatch({ type: 'ALL_CONVERSATIONS', payload: response.data });
    });
  };
  return thunkFunction;
};

export const addMessages = (message) => {
  const thunkFunction = (dispatch, getState) => {
    const { conversations } = getState();
    const payload = conversations.map((conversation) => {
      if (conversation.id === message.conversation_id) {
        conversation.messages.push(message);
        return conversation;
      }
      return conversation;
    });
    dispatch({ type: 'ADD_MESSAGE', payload });
  };
  return thunkFunction;
};

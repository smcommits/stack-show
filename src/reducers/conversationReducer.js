import BackendAPI from '../core/services/api';

const conversationReducer = (state = [], action) => {
  switch (action.type) {
    case ('ALL_CONVERSATIONS'):
      return action.payload;
    case ('ADD_CONVERSATION'):
      return [...state, action.payload];
    case ('ADD_MESSAGE'):
      return action.payload;
    default:
      return state;
  }
};

const fetchConversations = () => {
  const thunkFunction = async (dispatch, useState) => {
    BackendAPI.allConversations()
      .then((response) => {
        dispatch({ type: 'ALL_CONVERSATIONS', payload: response.data });
      });
  };
  return thunkFunction;
};

const addMessages = (message) => {
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

export { conversationReducer, fetchConversations, addMessages };

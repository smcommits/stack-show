/* eslint-disable no-unused-vars */

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
export default conversationReducer;

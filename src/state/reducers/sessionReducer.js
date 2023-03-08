/* eslint-disable no-unused-vars */

const sessionReducer = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case ('SET_CURRENT_USER'):
      return { authenticated: true, currentUser: action.payload };
    case ('DELETE_CURRENT_USER'):
      return { authenticated: false };
    case ('UPDATE_USER_IMAGE'):
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

export default sessionReducer;

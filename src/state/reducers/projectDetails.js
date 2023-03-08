/* eslint-disable no-unused-vars */
const projectDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ('GET_DETAILS'):
      return {
        details: action.payload,
      };
    default:
      return state;
  }
};

export default projectDetailsReducer;

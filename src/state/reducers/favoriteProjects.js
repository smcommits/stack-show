/* eslint-disable no-unused-vars */
const favoriteProjectsReducer = (state = [], action) => {
  switch (action.type) {
    case ('FETCH_FAVORITE_PROJECTS'):
      return [...action.payload];
    default:
      return state;
  }
};

export default favoriteProjectsReducer;

import BackendAPI from '../core/services/api';

const favoriteProjectsReducer = (state = [], action) => {
  switch (action.type) {
    case ('FETCH_FAVORITE_PROJECTS'):
      return [...action.payload];
    default:
      return state;
  }
};

const fetchFavorites = () => {
  const thunkFuntion = async (dispatch, getState) => {
    dispatch({ type: 'SHOW_LOADER' });
    BackendAPI.favoriteProjects()
      .then((response) => {
        dispatch({ type: 'FETCH_FAVORITE_PROJECTS', payload: response.data });
        dispatch({ type: 'HIDE_LOADER' });
      });
  };
  return thunkFuntion;
};

export { favoriteProjectsReducer, fetchFavorites };

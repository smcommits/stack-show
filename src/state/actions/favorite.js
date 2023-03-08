import { BackendAPI } from '../../services';
import loaderActions from './loader';

// eslint-disable-next-line import/prefer-default-export
export const fetchFavorites = () => {
  const thunkFuntion = async (dispatch) => {
    dispatch(loaderActions.startLoading('favorites'));
    BackendAPI.favoriteProjects()
      .then((response) => {
        dispatch({ type: 'FETCH_FAVORITE_PROJECTS', payload: response.data.data });
        dispatch(loaderActions.stopLoading('favorites'));
      });
  };
  return thunkFuntion;
};

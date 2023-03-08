import { BackendAPI } from '../../services';
import loaderActions from './loader';

export const fetchProjects = (page) => {
  const thunkFunction = async (dispatch, getState) => {
    dispatch(loaderActions.startLoading('homepage'));
    BackendAPI.getAllProjects(page)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'FETCH_PROJECTS', payload: res.data });
          dispatch(loaderActions.stopLoading('homepage'));
        }
      });
  };
  return thunkFunction;
};

export const fetchProjectDetails = (id) => {
  const thunkFuntion = async (dispatch, getState) => {
    dispatch(loaderActions.startLoading('projectPage'));
    BackendAPI.getProjectDetails(id)
      .then((response) => {
        dispatch({ type: 'GET_DETAILS', payload: response.data });
        dispatch(loaderActions.stopLoading('projectPage'));
      });
  };

  return thunkFuntion;
};

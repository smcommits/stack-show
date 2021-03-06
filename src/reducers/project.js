/* eslint-disable no-unused-vars */
import BackendAPI from '../core/services/api';

const projectReducer = (state = [], action) => {
  switch (action.type) {
    case ('FETCH_PROJECTS'):
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const fetchProjects = (page) => {
  const thunkFunction = async (dispatch, getState) => {
    dispatch({ type: 'SHOW_LOADER' });

    BackendAPI.getAllProjects(page)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'FETCH_PROJECTS', payload: res.data });
          dispatch({ type: 'HIDE_LOADER' });
        }
      });
  };
  return thunkFunction;
};

export { projectReducer, fetchProjects };

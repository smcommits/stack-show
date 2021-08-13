/* eslint-disable no-unused-vars */

import BackendAPI from '../core/services/api';

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

const fetchProjectDetails = (id) => {
  const thunkFuntion = async (dispatch, getState) => {
    dispatch({ type: 'SHOW_LOADER' });
    BackendAPI.getProjectDetails(id)
      .then((response) => {
        dispatch({ type: 'GET_DETAILS', payload: response.data });
        dispatch({ type: 'HIDE_LOADER' });
      });
  };

  return thunkFuntion;
};

export { projectDetailsReducer, fetchProjectDetails };

import BackendAPI from '../core/services/api';

const projectReducer = (state = [], action) => {
  switch (action.type) {
    case ('FETCH_PROJECTS'):
      return [...action.payload];
    default:
      return state;
  }
};

const fetchProjects = () => {
  const thunkFunction = async (dispatch, getState) => {
    dispatch({ type: 'SHOW_LOADER' });

    BackendAPI.getAllProjects()
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'FETCH_PROJECTS', payload: res.data });
        }
        dispatch({ type: 'HIDE_LOADER' });
      });
  };
  return thunkFunction;
};

export { projectReducer, fetchProjects };

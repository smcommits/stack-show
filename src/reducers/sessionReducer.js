import Auth from '../core/services/authentications';

const sessionReducer = (state = '', action) => {
  switch (action.type) {
    case ('SET_CURRENT_USER_TRUE'):
      return action.payload;
    case ('SET_CURRENT_USER_FALSE'):
      return '';
    default:
      return state;
  }
};

const validateUser = () => {
  const thunkFunction = async (dispatch, getState) => {
    dispatch({ type: 'SHOW_LOADER' });

    Auth.userValidation()
      .then((res) => {
        if (res.success) {
          dispatch({ type: 'SET_CURRENT_USER_TRUE', payload: res.data });
        }
        dispatch({ type: 'HIDE_LOADER' });
      });
  };
  return thunkFunction;
};

const logOutUser = () => {
  const thunkFunction = async (dispatch, getState) => {
    dispatch({ type: 'SHOW_LOADER' });
    Auth.signOut()
      .then((res) => {
        if (res.success) {
          dispatch({ type: 'SET_CURRENT_USER_FALSE' });
        }
        dispatch({ type: 'HIDE_LOADER' });
      });
  };
  return thunkFunction;
};

export { sessionReducer, validateUser, logOutUser };

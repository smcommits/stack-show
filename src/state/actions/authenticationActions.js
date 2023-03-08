import { Auth } from '../../services';

export const setCurrentUser = (userData) => ({ type: 'SET_CURRENT_USER', payload: userData });

export const validateUser = () => {
  const thunkFunction = async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });
    Auth.userValidation()
      .then((res) => {
        if (res.success) {
          dispatch({ type: 'SET_CURRENT_USER', payload: res.data });
        }
        dispatch({ type: 'HIDE_LOADER' });
      });
  };
  return thunkFunction;
};

export const logOutUser = () => {
  const thunkFunction = async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });
    Auth.signOut()
      .then((res) => {
        if (res.success) {
          dispatch({ type: 'DELETE_CURRENT_USER' });
        }
        dispatch({ type: 'HIDE_LOADER' });
      });
  };
  return thunkFunction;
};

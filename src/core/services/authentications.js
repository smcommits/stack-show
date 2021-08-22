import RequestClients from '../clients/index';
import LocalStorageHelper from '../helpers/localStorageHelpe';

const Auth = (() => {
  const { authClient } = RequestClients;

  const authHeaders = () => JSON.parse(localStorage.getItem('user'));
  const endPoints = {
    signIn: '/sign_in',
    signOut: '/sign_out',
    resetPassword: '/password',
    validateUser: '/validate_token',
  };

  const signIn = async (formData) => {
    try {
      const res = await authClient.post(endPoints.signIn, formData);
      return res;
    } catch (err) {
      if (err.response) {
        return { ...err.response };
      }
      return err;
    }
  };

  const signUp = async (formData) => {
    try {
      const res = await authClient.post(formData);
      return { ...res.data };
    } catch (err) {
      if (err.response) {
        return { ...err.response.data };
      }
      return err;
    }
  };

  const signOut = async () => {
    try {
      const res = await authClient.delete(endPoints.signOut, authHeaders());
      LocalStorageHelper.removeAuthHeaders();
      return { ...res.data };
    } catch (err) {
      if (err.response) {
        return { ...err.response.data };
      }
      return err;
    }
  };

  const userValidation = async () => {
    try {
      const res = await authClient.get(endPoints.validateUser, authHeaders());
      return { ...res.data };
    } catch (err) {
      if (err.response) {
        LocalStorageHelper.removeAuthHeaders();
        return { ...err.response.data };
      }
      return err;
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    userValidation,
  };
})();

export default Auth;

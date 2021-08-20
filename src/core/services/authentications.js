import axios from 'axios';

const Auth = (() => {
  const endPoints = {
    rootURI: 'http://localhost:5000/auth',
    signIn: '/sign_in',
    signOut: '/sign_out',
    resetPassword: '/password',
    validateUser: '/validate_token',
  };

  const baseConfig = {
    withCredentials: true,
  };

  const signIn = async (formData) => {
    try {
      const res = await axios.post(
        endPoints.rootURI + endPoints.signIn,
        formData,
        baseConfig,
      );
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
      const res = await axios.post(
        endPoints.rootURI,
        formData,
        baseConfig,
      );

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
      const res = await axios.delete(
        endPoints.rootURI + endPoints.signOut,
        baseConfig,
      );
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
      const res = await axios.get(
        endPoints.rootURI + endPoints.validateUser,
        baseConfig,
      );
      return { ...res.data };
    } catch (err) {
      if (err.response) {
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

import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from '../../core/services/authentications';
import styles from '../../stylesheets/AuthForm.module.scss';
import { validateSignUpForm, validateLoginForm } from './validate';
import AuthForm from './AuthForm';

const AuthFormContainer = (props) => {
  const { setCurrentUser } = props;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [signUpErrors, setSignUpErrors] = useState({});
  const [logInErrors, setLoginErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async () => {
    const res = await Auth.signUp(formData);
    if (res.status === 'success') {
      setSuccess(true);
      setCurrentUser(res.data.uid);
    } else {
      setSuccess(false);
    }
  };

  const handleLogInSubmit = async () => {
    const res = await Auth.signIn(formData);
    if (res.status === 200) {
      setSuccess(true);
      setCurrentUser(res.data.data.uid);
    } else {
      setSuccess(false);
      setLoginErrors({ ...logInErrors, message: res.data.errors[0] });
    }
  };

  const validateSignUp = (e) => {
    e.preventDefault();
    const validated = validateSignUpForm(formData);
    if (validated.success) {
      handleSignUpSubmit(formData);
    } else {
      setSignUpErrors(validated.errors);
    }
  };

  const validateLogin = (e) => {
    e.preventDefault();
    const validated = validateLoginForm(formData);
    if (validated.success) {
      handleLogInSubmit(formData);
    } else {
      setLoginErrors(validated.errors);
    }
  };

  return (
    <>
      {success && <Redirect to="/" />}
      <AuthForm
        styles={styles}
        handleChange={handleChange}
        handleSignUpSubmit={handleSignUpSubmit}
        handleLogInSubmit={handleLogInSubmit}
        validateSignUp={validateSignUp}
        validateLogin={validateLogin}
        signUpErrors={signUpErrors}
        logInErrors={logInErrors}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (payload) => {
    dispatch({ type: 'SET_CURRENT_USER_TRUE', payload });
  },
});

const AuthFormConnect = connect(null, mapDispatchToProps)(AuthFormContainer);

export default AuthFormConnect;

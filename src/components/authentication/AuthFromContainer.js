import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Auth } from '../../services';
import { setCurrentUser, loaderActions } from '../../state/actions';
import { withAuth } from '../common';
import styles from '../../stylesheets/AuthForm.module.scss';
import { validateSignUpForm, validateLoginForm } from './validate';
import AuthForm from './AuthForm';

const AuthFormContainer = ({ authenticated }) => {
  if (authenticated) return <Redirect to="/" />;
  const [formData, setFormData] = useState({});
  const [signUpErrors, setSignUpErrors] = useState({});
  const [logInErrors, setLoginErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async () => {
    dispatch(loaderActions.startLoading('signUp'));
    const res = await Auth.signUp(formData);
    if (res.status === 'success') {
      setSuccess(true);
      dispatch(setCurrentUser(res.data));
      dispatch(loaderActions.stopLoading('signUp'));
    } else {
      setSuccess(false);
      dispatch(loaderActions.stopLoading('signUp'));
      try {
        setSignUpErrors({ ...signUpErrors, message: res.errors.full_messages[0] });
      } catch {
        setSignUpErrors({ ...signUpErrors, message: 'Something went wrong' });
      }
    }
  };

  const handleLogInSubmit = async () => {
    dispatch(loaderActions.startLoading('login'));
    const res = await Auth.signIn(formData);
    if (res.status === 200) {
      setSuccess(true);
      dispatch(setCurrentUser(res.data.data));
      dispatch(loaderActions.stopLoading('login'));
    } else {
      setSuccess(false);
      dispatch(loaderActions.stopLoading('login'));
      try {
        setLoginErrors({ ...logInErrors, message: res.data.errors[0] });
      } catch {
        setLoginErrors({ ...logInErrors, message: 'Something went wrong!' });
      }
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

export default withAuth(AuthFormContainer);

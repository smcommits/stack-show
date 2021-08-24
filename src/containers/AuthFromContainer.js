import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; import Auth from '../core/services/authentications';
import styles from '../stylesheets/AuthForm.module.scss';
import { validateSignUpForm, validateLoginForm } from '../components/authentication/validate';
import AuthForm from '../components/authentication/AuthForm';

const AuthFormContainer = (props) => {
  const { setCurrentUser } = props;
  const [formData, setFormData] = useState({});

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
      setCurrentUser(res.data);
    } else {
      setSuccess(false);
      try {
        setSignUpErrors({ ...signUpErrors, message: res.errors.full_messages[0] });
      } catch {
        setSignUpErrors({ ...signUpErrors, message: 'Something went wrong' });
      }
    }
  };

  const handleLogInSubmit = async () => {
    const res = await Auth.signIn(formData);
    if (res.status === 200) {
      setSuccess(true);
      setCurrentUser(res.data.data);
    } else {
      setSuccess(false);
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

AuthFormContainer.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (payload) => {
    dispatch({ type: 'SET_CURRENT_USER_TRUE', payload });
  },
});

const AuthFormConnect = connect(null, mapDispatchToProps)(AuthFormContainer);

export default AuthFormConnect;

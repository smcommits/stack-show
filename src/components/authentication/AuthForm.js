import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import LogIn from './LogIn';

const AuthForm = (props) => {
  const [formType, setFormType] = useState('logIn');

  const {
    styles,
    handleChange,
    validateSignUp,
    signUpErrors,
    validateLogin,
    logInErrors,
  } = props;

  const switchForm = (e) => {
    setFormType(e.currentTarget.dataset.attribute);
  };
  const isLogin = formType === 'logIn';
  const isSignUp = formType === 'signUp';

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <ul className={styles.tabbedNav}>
          <li>
            <button type="submit" onClick={switchForm} data-attribute="logIn" className={(isLogin && styles.active) || undefined}>
              <strong>Log In</strong>
            </button>
          </li>
          <li>
            <button type="button" onClick={switchForm} data-attribute="signUp" className={(isSignUp && styles.active) || undefined}>
              <strong>Sign Up</strong>
            </button>
          </li>
        </ul>

        {isLogin && (
        <LogIn
          handleChange={handleChange}
          handleLogInSubmit={validateLogin}
          styles={styles}
          errors={logInErrors}
        />
        )}

        {isSignUp && (
        <SignUp
          handleChange={handleChange}
          handleSignUpSubmit={validateSignUp}
          styles={styles}
          errors={signUpErrors}
        />
        )}
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
  validateSignUp: PropTypes.func.isRequired,
  validateLogin: PropTypes.func.isRequired,
  signUpErrors: PropTypes.instanceOf(Object).isRequired,
  logInErrors: PropTypes.instanceOf(Object).isRequired,
};

export default AuthForm;

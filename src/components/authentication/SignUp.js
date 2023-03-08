import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Bars } from 'react-loader-spinner';
import InputField from './InputField';

const SignUp = (props) => {
  const {
    handleChange, handleSignUpSubmit, styles, errors,
  } = props;
  const loading = useSelector((state) => state.componentLoading.signUp);
  return (
    <form>
      <div className={styles.formText}>
        <h3>Sign Up</h3>
        <p>Hi, welcome to Stack Show. Please sign up to continue.</p>
      </div>
      {errors.message && <p className={styles.formError}>{errors.message}</p>}

      <InputField
        placeholder="Username"
        handleChange={handleChange}
        type="text"
        name="name"
        iconPath="https://img.icons8.com/fluency-systems-filled/48/null/user.png"
        errors={errors.username}
      />

      <InputField
        placeholder="Email"
        handleChange={handleChange}
        type="email"
        name="email"
        iconPath="https://img.icons8.com/material-sharp/48/null/new-post.png"
        errors={errors.email}
      />

      <InputField
        placeholder="Password"
        handleChange={handleChange}
        type="password"
        name="password"
        iconPath="https://img.icons8.com/material-rounded/48/null/password.png"
        errors={errors.password}
      />

      <InputField
        placeholder="Confirm Password"
        handleChange={handleChange}
        type="password"
        name="confirm_password"
        iconPath="https://img.icons8.com/material/48/null/good-pincode.png"
        errors={errors.pwconfirm}
      />

      <button onClick={handleSignUpSubmit} type="submit" data-testid="submit-button">
        {loading ? (
          <Bars
            height="20"
            width="30"
            color="#f6f6f6"
            ariaLabel="bars-loading"
            visible
          />
        ) : 'Sign Up'}
      </button>
    </form>
  );
};

SignUp.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSignUpSubmit: PropTypes.func.isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
};

export default SignUp;

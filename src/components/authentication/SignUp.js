import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';

const SignUp = (props) => {
  const {
    handleChange, handleSignUpSubmit, styles, errors,
  } = props;
  return (
    <form>
      <div className={styles.formText}>
        <h3>Sign Up</h3>
        <p>Hi, welcome to Stack Show. Please sign up to contintue.</p>
      </div>
      {errors.message && <p className={styles.formError}>{errors.message}</p>}

      <InputField
        placeholder="username"
        handleChange={handleChange}
        type="text"
        name="name"
        errors={errors.username}
      />

      <InputField
        placeholder="email@example.com"
        handleChange={handleChange}
        type="email"
        name="email"
        errors={errors.email}
      />

      <InputField
        placeholder="password"
        handleChange={handleChange}
        type="password"
        name="password"
        errors={errors.password}
      />

      <InputField
        placeholder="confirm password"
        handleChange={handleChange}
        type="password"
        name="confirm_password"
        errors={errors.pwconfirm}
      />

      <button onClick={handleSignUpSubmit} type="submit">Sign Up</button>
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

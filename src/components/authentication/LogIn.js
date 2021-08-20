import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';

const LogIn = (props) => {
  const {
    handleChange, handleLogInSubmit, styles, errors,
  } = props;

  return (

    <form>
      <div className={styles.formText}>
        <h3>Sign In</h3>
        <p>Hi, welcome to Stack Show. Please sign in to contintue.</p>
      </div>
      {errors.message && <p className={styles.formError}>{errors.message}</p>}
      <InputField
        handleChange={handleChange}
        type="email"
        name="email"
        errors={errors.email}
      />

      <InputField
        handleChange={handleChange}
        type="password"
        name="password"
        errors={errors.password}
      />

      <button onClick={handleLogInSubmit} type="submit">Submit</button>
    </form>
  );
};
LogIn.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleLogInSubmit: PropTypes.func.isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
};

export default LogIn;

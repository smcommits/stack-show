import React from 'react';
import InputField from './InputField';
import styles from '../../stylesheets/AuthForm.module.scss'
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

export default LogIn;

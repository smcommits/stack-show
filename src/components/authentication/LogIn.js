import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Bars } from 'react-loader-spinner';
import InputField from './InputField';

const LogIn = (props) => {
  const {
    handleChange, handleLogInSubmit, styles, errors,
  } = props;

  const loading = useSelector((state) => state.componentLoading.login);

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
        iconPath="https://img.icons8.com/material-sharp/48/null/new-post.png"
        placeholder="Email"
      />

      <InputField
        handleChange={handleChange}
        type="password"
        name="password"
        errors={errors.password}
        iconPath="https://img.icons8.com/material-rounded/48/null/password.png"
        placeholder="Password"
      />

      <button onClick={handleLogInSubmit} type="submit">
        {loading ? (
          <Bars
            height="20"
            width="30"
            color="#f6f6f6"
            ariaLabel="bars-loading"
            visible
          />
        ) : 'Login'}
      </button>
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

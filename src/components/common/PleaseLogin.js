import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../stylesheets/PleaseLogin.module.scss';

const PleaseLogin = (props) => {
  const { text } = props;
  return (
    <div className={styles.container}>
      <div className={styles.callToAction}>
        <p>{text}</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
PleaseLogin.propTypes = {
  text: PropTypes.string.isRequired,
};
export default PleaseLogin;

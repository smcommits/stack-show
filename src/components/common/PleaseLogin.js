import { Link } from 'react-router-dom';
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

export default PleaseLogin;

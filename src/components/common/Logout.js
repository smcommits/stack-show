import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOutUser } from '../../state/actions';
import styles from '../../stylesheets/Generic.module.scss';

const Logout = (props) => {
  const { menuHandler } = props;
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.session.authenticated);
  const handleLogout = (e) => {
    e.preventDefault();
    menuHandler();
    dispatch(logOutUser());
  };
  return (
    <div className={styles.logoutButton}>
      {!authenticated && <Redirect to="/" />}
      <button type="submit" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

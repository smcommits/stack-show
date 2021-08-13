import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../reducers/sessionReducer';
import styles from '../stylesheets/Nav.module.scss';

const Nav = (props) => {
  const { currentUser, logOut } = props;

  const handleLogout = () => {
    logOut();
  };

  return (
    <nav className={styles.mainNav}>
      <ul>
        <i class="las la-bars"></i>
        {currentUser && (
        <li>
          <button type="button" onClick={handleLogout}>Log Out</button>
        </li>
        )}
      </ul>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => {
    dispatch(logOutUser());
  },
});

const NavConnected = connect(null, mapDispatchToProps)(Nav);
export default NavConnected;

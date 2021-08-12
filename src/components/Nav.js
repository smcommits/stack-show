import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../reducers/sessionReducer';

const Nav = (props) => {
  const { currentUser, logOut } = props;

  const handleLogout = () => {
    logOut();
  };

  return (
    <nav>
      <ul>
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

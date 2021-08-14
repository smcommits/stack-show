import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../reducers/sessionReducer';
import styles from '../stylesheets/Nav.module.scss';
import Search from './Search';
import Menu from './Menu';

const Nav = (props) => {
  const { currentUser, logOut } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const handleLogout = () => {
    logOut();
  };

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNavUl}>
        <i onClick={handleMenu} className="las la-bars" />
        <h1>HomePage</h1>
        <div className={styles.place}/>
        <Search />
      </ul>

      <Menu menuHandler={handleMenu} open={openMenu} logOut={logOut}/>

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

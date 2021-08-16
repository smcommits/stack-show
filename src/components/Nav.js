import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../reducers/sessionReducer';
import styles from '../stylesheets/Nav.module.scss';
import Search from './helpers/search/Search';
import Menu from './Menu';
import BackendAPI from '../core/services/api';
import searchStyles from '../stylesheets/Search.module.scss';

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
        <i onClick={handleMenu} className="las la-bars displayMobileNone" />
        <h1>HomePage</h1>
        <div className={styles.place} />
        <Menu menuHandler={handleMenu} open={openMenu} logOut={logOut} />
        <Search endpoint={BackendAPI.searchProject.bind(BackendAPI)}  styles={searchStyles}/>
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

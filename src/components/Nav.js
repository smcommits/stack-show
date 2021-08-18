import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { logOutUser } from '../reducers/sessionReducer';
import styles from '../stylesheets/Nav.module.scss';
import Search from './helpers/search/Search';
import Menu from './Menu';
import BackendAPI from '../core/services/api';
import searchStyles from '../stylesheets/Search.module.scss';
import UserDetails from './helpers/UserDetails';

const Nav = (props) => {
  const {
    currentUser, logOut, componentName, updateUserImage,
  } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const handleLogout = () => {
    logOut();
  };

  const isLarge = useMediaQuery({
    query: '(min-width: 968px)',
  });
  const { name, avatar_path, id } = currentUser;

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNavUl}>
        <i onClick={handleMenu} className="las la-bars" />
        <h1 className={styles.parentName}>{componentName}</h1>
        <div className={styles.place} />
        <Menu
          menuHandler={handleMenu}
          open={openMenu}
          logOut={logOut}
          updateImage={updateUserImage}
          propStyles={styles}
        />
        <Search endpoint={BackendAPI.searchProject.bind(BackendAPI)} styles={searchStyles} />
      </ul>

    </nav>
  );
};

const mapStateToProps = (state) => ({
  componentName: state.currentComp,
});
const mapDispatchToProps = (dispatch) => ({
  logOut: () => {
    dispatch(logOutUser());
  },
  updateUserImage: (image) => {
    dispatch({ type: 'UPDATE_USER_IMAGE', payload: image });
  },
});

const NavConnected = connect(mapStateToProps, mapDispatchToProps)(Nav);
export default NavConnected;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOutUser } from '../reducers/sessionReducer';
import styles from '../stylesheets/Nav.module.scss';
import Menu from './Menu';
import Search from '../components/helpers/search/Search';

const Nav = (props) => {
  const {
    logOut, componentName, updateUserImage,
  } = props;
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNavUl}>
        <i onClick={handleMenu} className="las la-bars" role="presentation" />
        <h1 className={styles.parentName}>{componentName}</h1>
        <div className={styles.place} />
        <Search />
        <Menu
          menuHandler={handleMenu}
          open={openMenu}
          logOut={logOut}
          updateImage={updateUserImage}
          propStyles={styles}
        />
      </ul>

    </nav>
  );
};

Nav.propTypes = {
  logOut: PropTypes.func.isRequired,
  componentName: PropTypes.string.isRequired,
  updateUserImage: PropTypes.func.isRequired,
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from '../../stylesheets/Nav.module.scss';
import Menu from '../menu/Menu';
import Search from '../helpers/search/Search';

const Nav = (props) => {
  const componentName = useSelector((state) => state.currentComp);
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
          propStyles={styles}
        />
      </ul>

    </nav>
  );
};

export default Nav;

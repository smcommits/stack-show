import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Menu.module.scss';

const Menu = (props) => {
  const {
    currentUser, menuHandler, open, logOut,
  } = props;

  const { name, avatar_path: avatarPath } = currentUser;

  return (

    <nav className={`${styles.mainMenu} ${open && styles.show}`}>
      <i className="las la-times displayMobileNone" onClick={menuHandler}/>
      <section className={styles.userSection}>
        <img src={avatarPath || '/profile.png'} alt="user" />
        <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
      </section>
      <ul>
        <li><Link to="/" onClick={menuHandler}>Home</Link></li>
        <li><Link to="/favorites" onClick={menuHandler}>Favorites</Link></li>
        <li><Link to='/create' onClick={menuHandler}>Create Project</Link></li>
        <li onClick={logOut}>Logout</li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const MenuConnected = connect(mapStateToProps, null)(Menu);

export default MenuConnected;

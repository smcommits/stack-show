import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../stylesheets/Menu.module.scss';
import UserDetails from './helpers/UserDetails';

const Menu = (props) => {
  const {
    currentUser,
    menuHandler,
    open,
    logOut,
    propStyles,
    updateImage,
  } = props;

  const { name, avatar_path: avatarPath, id } = currentUser;

  return (

    <nav className={`${styles.mainMenu} ${open && styles.show}`} >
      <button onClick={menuHandler} type="button" className={styles.closeButton}><i className="las la-times" /></button>
      <UserDetails
        styles={styles}
        imagePath={avatarPath}
        name={name}
        id={id}
        updateImage={updateImage}
      />
      <ul>
        <li><Link to="/" onClick={menuHandler}>Home</Link></li>
        <li><Link to="/favorites" onClick={menuHandler}>Favorites</Link></li>
        <li><Link to="/create" onClick={menuHandler}>Create Project</Link></li>
        <li><Link to="/conversations" onClick={menuHandler}>Conversations</Link></li>
        <li><button type="button">Logout</button></li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const MenuConnected = connect(mapStateToProps, null)(Menu);

export default MenuConnected;

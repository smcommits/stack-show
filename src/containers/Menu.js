import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; import PropTypes from 'prop-types';
import styles from '../stylesheets/Menu.module.scss';
import UserDetails from '../components/helpers/UserDetails';

const Menu = (props) => {
  const {
    currentUser,
    menuHandler,
    open,
    logOut,
    updateImage,
  } = props;

  const { name, image, id } = currentUser;

  return (

    <nav className={`${styles.mainMenu} ${open && styles.show}`}>
      <button
        aria-label="toggle menu"
        onClick={menuHandler}
        type="button"
        className={styles.closeButton}
      >
        <i className="las la-times" />
      </button>
      <UserDetails
        styles={styles}
        imagePath={image}
        name={name}
        id={id}
        updateImage={updateImage}
      />
      <ul>
        <li><Link to="/" onClick={menuHandler}>Home</Link></li>
        <li><Link to="/favorites" onClick={menuHandler}>Favorites</Link></li>
        <li><Link to="/create" onClick={menuHandler}>Create Project</Link></li>
        <li><Link to="/conversations" onClick={menuHandler}>Conversations</Link></li>
        <li><button type="button" onClick={logOut}>Logout</button></li>
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  currentUser: PropTypes.instanceOf(Object).isRequired,
  menuHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const MenuConnected = connect(mapStateToProps, null)(Menu);

export default MenuConnected;

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; import PropTypes from 'prop-types';
import styles from '../../stylesheets/Menu.module.scss';
import { UserDetails, withAuth, Logout } from '../common';

const Menu = (props) => {
  const {
    authenticated,
    menuHandler,
    open,
  } = props;

  const { id, name, image } = authenticated
    ? useSelector((state) => state.session.currentUser)
    : {};

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
      {authenticated ? (
        <UserDetails
          styles={styles}
          imagePath={image}
          name={name}
          id={id}
        />
      )
        : (
          <Link onClick={menuHandler} className={styles.login} to="/login">
            Login
          </Link>
        )}
      <ul>
        <li><Link to="/" onClick={menuHandler}>Home</Link></li>
        <li><Link to="/favorites" onClick={menuHandler}>Favorites</Link></li>
        <li><Link to="/create" onClick={menuHandler}>Create Project</Link></li>
        <li><Link to="/conversations" onClick={menuHandler}>Conversations</Link></li>
        { authenticated && <Logout menuHandler={menuHandler} />}
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  menuHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withAuth(Menu);

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../../../stylesheets/HomePage.module.scss';

const SearchItem = (props) => {
  const { option, toggleSearch } = props;

  return (
    <li className={styles.search_list_item}>
      <Link to={`/project/${option.id}`} onClick={toggleSearch}>
        <div className={styles.search_item}>
          {option.title}
        </div>
      </Link>
    </li>
  );
};

SearchItem.propTypes = {
  option: PropTypes.instanceOf(Object).isRequired,
  toggleSearch: PropTypes.func.isRequired,
};

export default SearchItem;

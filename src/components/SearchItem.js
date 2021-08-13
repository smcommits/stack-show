import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../stylesheets/Search.module.scss';

const SearchItem = (props) => {
  const { option } = props;

  return (
    <li className={styles.search_list_item}>
      <Link to={`/actor/${option.id}`}>
        <div className={styles.search_item}>
          {option.name}
          <figure>
            <img src={`https://image.tmdb.org/t/p/w200/${option.profile_path}`} alt="" />
          </figure>
        </div>
      </Link>
    </li>
  );
};

SearchItem.propTypes = {
  option: PropTypes.instanceOf(Object).isRequired,
};

export default SearchItem;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomSearchHook from './CustomSearchHook';
import SearchItem from './SearchItem';
import styles from '../stylesheets/Search.module.scss';
import Loader from './Loader';

const Search = (props) => {
  const { parent } = props;
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isParentActor = parent === 'actorPage';

  const { options, loading } = CustomSearchHook(query);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const toggleSearch = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(!isOpen);
    }
  };

  const optionsList = options.map((option) => (<SearchItem key={option.id} option={option} />));

  return (
    <div className={styles.search_bar} onFocus={toggleSearch} onBlur={toggleSearch}>
      <div className={`${styles.search_input} ${'search_options'}`}>
        {isParentActor
        && (
        <Link to="/">
          <i className="las la-angle-left" />
        </Link>
        )}
        {(isOpen
          && (
          <button onClick={toggleSearch} type="button" className={`non-button ${(isParentActor && styles.reverse_search_bar) || undefined}`}>
            <i className="las la-times" />
          </button>
          )
        )
        || <i className={`las la-search ${isParentActor && styles.reverse_search_bar}`} />}

        <input className={styles.input} type="text" onChange={handleSearch} placeholder="Search for actor" />
      </div>
      {isOpen
        && (
        <ul id="nameSelect" name="name" className={`${styles.name_list}`}>
          {optionsList}
          <li className={styles.loader_search}>{loading && <Loader loading={loading} />}</li>
        </ul>
        )}

    </div>
  );
};

Search.propTypes = {
  parent: PropTypes.string.isRequired,
};
export default Search;


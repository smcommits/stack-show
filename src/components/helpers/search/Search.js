import React, { useState } from 'react';
import CustomSearchHook from './CustomSearchHook';
import SearchItem from './SearchItem';
import Loader from '../Loader';
import styles from '../../../stylesheets/Search.module.scss';
import BackendAPI from '../../../core/services/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { options, loading } = CustomSearchHook(query, BackendAPI.searchProject.bind(BackendAPI));
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const searchOrCloseButton = () => (
    isOpen ? <i onClick={toggleSearch} data-testid="search-trigger" className={`las la-times interactive ${styles.searchToggle}`} role="presentation" />
      : <i onClick={toggleSearch} data-testid="search-trigger" className={`las la-search interactive ${styles.searchToggle}`} role="presentation" />);

  const optionsList = options.map(
    (option) => (<SearchItem key={option.id} option={option} toggleSearch={toggleSearch} />),
  );

  return (
    <div className={`${styles.searchWrapper} ${isOpen && styles.show}`}>
      <div className={`${styles.inputContainer} ${(isOpen && styles.show) || styles.hide}`}>
        <input type="text" onChange={handleSearch} placeholder="Search for projects" />
      </div>
      {searchOrCloseButton()}
      {isOpen && (
        <ul className={styles.searchList}>
          {optionsList}
          <Loader loading={loading} />
        </ul>
      )}
    </div>
  );
};

export default Search;

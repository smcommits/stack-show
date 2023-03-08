import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import CustomSearchHook from './CustomSearchHook';
import SearchItem from './SearchItem';
import styles from '../../../stylesheets/Search.module.scss';
import { BackendAPI } from '../../../services';

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
          {!loading && !optionsList.length && <li>No results found.</li>}
          {optionsList}
          {loading && (
          <li>
            <ThreeDots
              height="20"
              width="50"
              radius="9"
              color="#f6f6f6"
              wrapperStyle={{ justifyContent: 'center' }}
              ariaLabel="three-dots-loading"
              visible
            />
          </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;

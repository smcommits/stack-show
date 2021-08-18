import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomSearchHook from './CustomSearchHook';
import SearchItem from './SearchItem';

const Search = (props) => {
  const { parent, endpoint, styles } = props;
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isParentActor = parent === 'actorPage';

  const { options, loading } = CustomSearchHook(query, endpoint);
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const searchOrCloseButton = () => (isOpen ? <i onClick={toggleSearch} className={`las la-times ${styles.searchToggle}`} />
    : <i onClick={toggleSearch} className={`las la-search ${styles.searchToggle}`} />);

  const optionsList = options.map((option) => (<SearchItem key={option.id} option={option} toggleSearch={toggleSearch} />));

  return (
    <div className={`${styles.searchWrapper} ${isOpen && styles.show}`}>
      <div className={`${styles.inputContainer} ${(isOpen && styles.show) || styles.hide}`}>
        <input type="text" onChange={handleSearch} />
      </div>
      {searchOrCloseButton()}
      {isOpen && (
        <ul className={styles.searchList}>
          {optionsList}
        </ul>
      )}
    </div>
  );
};

Search.propTypes = {
  parent: PropTypes.string.isRequired,
};
export default Search;

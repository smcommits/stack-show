import React, { useState } from 'react';
import Search from '../helpers/search/Search';
import searchStyles from '../../stylesheets/Search.module.scss';
import styles from '../../stylesheets/Conversations.module.scss';
import BackendAPI from '../../core/services/api';
import CustomSearchHook from '../helpers/search/CustomSearchHook';

const FindUser = (props) => {
  const { findUser, handleConversation, currentUser } = props;
  const [query, setQuery] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const { options, loading } = CustomSearchHook(query, BackendAPI.searchUsers.bind(BackendAPI));

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const conversationHandler = (e) => {
    const reciever_id = e.currentTarget.dataset.attribute;
    const sender_id = currentUser.id;
    handleConversation('text', sender_id, reciever_id);
  };

  const searchOptions = options.map((option) => (
    <li key={Math.random()} className={styles.searchItem} onClick={conversationHandler} data-attribute={option.id}>
      <figure>
        <img src={option.image || './profile.png'} alt="user" />
      </figure>
      <strong>{option.name}</strong>
    </li>
  ));

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const toggleSelf = () => {
    findUser(false);
  };
  return (
    <section className={styles.findUser}>
      <i className="las la-times" onClick={toggleSelf} />
      <input type="" onChange={handleSearch} placeholder="Find a user" />
      <ul>
        {searchOptions}
      </ul>
    </section>
  );
};

export default FindUser;

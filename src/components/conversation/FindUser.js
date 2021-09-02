import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import PropTypes from 'prop-types';
import styles from '../../stylesheets/Conversations.module.scss';
import BackendAPI from '../../core/services/api';
import CustomSearchHook from '../helpers/search/CustomSearchHook';
import Loader from '../helpers/Loader';

const FindUser = (props) => {
  const { findUser, handleConversation, currentUser } = props;
  const [query, setQuery] = useState('');
  const { options, loading } = CustomSearchHook(query, BackendAPI.searchUsers.bind(BackendAPI));

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const conversationHandler = (e) => {
    const recieverId = Number(e.currentTarget.dataset.attribute);
    const senderId = currentUser.id;
    handleConversation('text', senderId, recieverId);
  };

  const searchOptions = options.map((option) => (
    <li
      key={Math.random()}
      className={`${styles.searchItem} interactive`}
      onClick={conversationHandler}
      data-attribute={option.id}
      role="presentation"
    >
      <figure>

        <Image cloudName="dfsniizqr" publicId={option.image}>
          <Transformation gravity="face" height="100" width="100" crop="fill" />
        </Image>

      </figure>
      <strong>{option.name}</strong>
    </li>
  ));

  const toggleSelf = () => {
    findUser(false);
  };
  return (
    <section className={styles.findUser}>
      <i className="las la-times" onClick={toggleSelf} role="presentation" />
      <input className={styles.searchInput} type="text" onChange={handleSearch} placeholder="Find a user" />
      <ul>
        {searchOptions}
        <li className={styles.loader}><Loader loading={loading} /></li>
      </ul>
    </section>
  );
};

FindUser.propTypes = {
  findUser: PropTypes.func.isRequired,
  handleConversation: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
};

export default FindUser;

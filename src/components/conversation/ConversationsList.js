import React from 'react';
import PropTypes from 'prop-types';
import ConversationListItem from './ConversationListItem';

const ConversationsList = (props) => {
  const {
    setActive,
    conversations,
    styles,
    currentUser,
    findUser,
  } = props;

  const newChat = () => {
    findUser(true);
  };
  const conversationList = conversations.map((conversation) => (
    <ConversationListItem
      key={conversation.id}
      conversation={conversation}
      styles={styles}
      setActive={setActive}
      currentUser={currentUser}
    />
  ));

  return (
    <ul className={styles.convList}>
      <li className={styles.header}>
        <h4>All Coversations</h4>
        <button type="submit" onClick={newChat}>
          <i className="las la-plus" />
        </button>
      </li>
      {conversationList}
    </ul>
  );
};

ConversationsList.propTypes = {
  setActive: PropTypes.func.isRequired,
  conversations: PropTypes.instanceOf(Object).isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  findUser: PropTypes.func.isRequired,
};

export default ConversationsList;

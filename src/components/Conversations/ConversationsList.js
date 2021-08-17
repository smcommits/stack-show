import React from 'react';
import { DateTime } from 'luxon';

const ConversationsList = (props) => {
  const {
    setActive,
    conversations,
    styles,
    messageSubscriber,
    setActiveIndex,
    currentUser,
    findUser,
  } = props;

  const newChat = () => {
    findUser(true);
  };
  const conversationList = conversations.map((conversation) => {
    //    messageSubscriber(conversation)
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const previewText = lastMessage ? lastMessage.text : '';
    const dateTime = lastMessage ? DateTime.fromISO(lastMessage.created_at).toLocaleString(DateTime.DATE_MED) : '';

    const sender = conversation.users.find((user) => user.id !== currentUser.id);
    if (!sender) {
      return null;
    }
    return (
      <li
        onClick={() => {
          setActive(conversation.id);
          setActiveIndex(1);
        }}
        key={conversation.id}
      >
        <figure>
          <img src={conversation.users[0].image || '/profile.png'} alt="" />
        </figure>
        <span>{sender.name}</span>
      </li>
    );
  });

  return (
    <ul className={styles.convList}>
      <li className={styles.header}>
        <h4>All Coversations</h4>
        <button type="submit" onClick={newChat}>
          <i class="las la-plus"></i>
        </button>
      </li>
      {conversationList}
    </ul>
  );
};

export default ConversationsList;

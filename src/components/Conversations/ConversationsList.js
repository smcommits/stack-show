import React from 'react';
import { DateTime } from 'luxon';
import { useMediaQuery } from 'react-responsive';

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

  const isLarge = useMediaQuery({
    query: '(min-width: 968px)',
  });

  const newChat = () => {
    findUser(true);
  };
  const conversationList = conversations.map((conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1] || {};
    const previewText = lastMessage ? lastMessage.text : '';
    const time = lastMessage.created_at;
    const dateTime = time ? DateTime.fromISO(time).toLocal().c : '';

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
        className={styles.convText}
      >
        <figure>
          <img src={conversation.users[0].image || '/profile.png'} alt="" />
        </figure>
        <div className={styles.right}>
          <div className={styles.top}>
            <span>{sender.name}</span>
            {isLarge && dateTime && <span className={styles.secondaryInfo}>{`${dateTime.hour}:${dateTime.minute}`}</span>}
          </div>
          {isLarge && previewText
          && (
          <div className={`${styles.secondaryInfo} ${styles.previewText}`}>
            {previewText}
          </div>
          )}
        </div>
      </li>
    );
  });

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

export default ConversationsList;

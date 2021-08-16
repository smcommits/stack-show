import React from 'react';
import { DateTime } from 'luxon';

const ConversationsList = (props) => {
  const {
    setActive, conversations, styles, messageSubscriber, setActiveIndex, currentUser,
  } = props;

  const conversationList = conversations.map((conversation) => {
    //    messageSubscriber(conversation)
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const previewText = lastMessage ? lastMessage.text : '';
    const dateTime = lastMessage ? DateTime.fromISO(lastMessage.created_at).toLocaleString(DateTime.DATE_MED) : '';

    const sender = conversation.users.find((user) => user.id !== currentUser.id);
    console.log(sender);
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
        <div className={styles.right}>
          <div className={styles.top}>
            <h4>{sender.name}</h4>
            <span className={`${styles.secondaryInfo}`}>{dateTime}</span>
          </div>
          <p className={`${styles.secondaryInfo}`}>{previewText}</p>
        </div>
      </li>
    );
  });

  return (
      <ul className={styles.convList}>
        {conversationList}
      </ul>
  );
};

export default ConversationsList;

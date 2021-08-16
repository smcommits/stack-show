import React from 'react';
import { DateTime } from 'luxon';

const ConversationsList = (props) => {
  const {
    setActive, conversations, styles, messageSubscriber,
  } = props;

  const conversationList = conversations.map((conversation) => {
    //    messageSubscriber(conversation)
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const previewText = lastMessage ? lastMessage.text : '';
    const dateTime = lastMessage ? DateTime.fromISO(lastMessage.created_at).toLocaleString(DateTime.DATE_MED) : '';
    return (

      <li onClick={() => setActive(conversation.id)} key={conversation.id}>
        <figure>
          <img src={conversation.users[0].image || '/profile.png'} alt="" />
        </figure>
        <div className={styles.right}>
          <div className={styles.top}>
            <h4>{conversation.users[0].name}</h4>
            <span className={`${styles.secondaryInfo} displayMobileNone `}>{dateTime}</span>
          </div>
          <p className={`${styles.secondaryInfo} displayMobileNone`}>{previewText}</p>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.convListContainer}>
      <ul className={styles.convList}>
        {conversationList}
      </ul>
    </div>
  );
};

export default ConversationsList;

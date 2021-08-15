import React, { useState, useEffect } from 'react';
import BackendAPI from '../../core/services/api';
import styles from '../../stylesheets/ConversationsList.module.scss';
import ActionCableManager from '../../core/helpers/actionCableHelper';

const ConversationsList = (props) => {
  const { setActive } = props;
  const [conversations, setConversations] = useState([]);

  const handleReceived = (response) => {
    const { conversation } = response;
    setConversations([...conversations, conversation]);
  };

  useEffect(() => {
    ActionCableManager.createSubscription({ channel: 'ConversationsChannel', recievedCallback: handleReceived });
    BackendAPI.allConversations()
      .then((res) => {
        setConversations(res.data);
        setActive(res.data[0]);
      });
  }, []);

  const conversationItems = conversations.map((conversation) => (
    <button onClick={() => setActive(conversation)} key={conversation.id} type="button">
      <li>
        <figure>
          <img src={conversation.users[0].image || '/profile.png'} alt="" className={styles.senderImage} />
        </figure>
        <strong className={styles.senderName}>{conversation.users[0].name}</strong>
      </li>
    </button>
  ));

  return (
    <section className={styles.convListContainer}>
      <ul className={styles.convList}>
        {conversationItems}
      </ul>
    </section>
  );
};
export default ConversationsList;

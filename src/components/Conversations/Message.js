import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import BackendAPI from '../../core/services/api';

const Message = (props) => {
  const { conversation, currentUser, styles } = props;
  const { messages } = conversation || {};

  if (messages === undefined) return null;

  const endDiv = useRef();

  const [text, setText] = useState('');

  useEffect(() => {
    endDiv.current.scrollIntoView({ behavoir: 'smooth' });
  });

  const messageList = messages.map((message) => {
    const time = message.created_at;
    return (
      <li
        key={message.id}
        className={
          message.user_id === currentUser.id
            ? styles.currentUserMessage : styles.senderMessage
        }
      >
        <p className={styles.messageText}>{message.text}</p>
        <span className={styles.messageTime}>{time}</span>
      </li>
    );
  });

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    BackendAPI.createMessage(text, conversation.id, currentUser.id).then((res) => {
    });
  };

  return (
    <section className={styles.messageSection}>
      <ul className={styles.messageList}>
        {messageList}
      </ul>
      <form action="" className={styles.messageFrom} onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" placeholder="Send a message" />
        <button type="submit" className={styles.sendButton}><i className="lar la-paper-plane" /></button>
      </form>
      <div ref={endDiv} />
    </section>

  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const MessageConnected = connect(mapStateToProps, null)(Message);

export default MessageConnected;

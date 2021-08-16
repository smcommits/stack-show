import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import BackendAPI from '../../core/services/api';

const Message = (props) => {
  const {
    conversation, currentUser, styles, setActiveIndex, findUser,
  } = props;
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

  const handleActive = () => {
    setActiveIndex(0);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    BackendAPI.createMessage(text, conversation.id, currentUser.id).then((res) => {
    });
  };

  const newChat = () => {
    findUser(true);
  };

  const sender = conversation.users.find((user) => user.id !== currentUser.id);
  if (!sender) {
    return null;
  }

  return (
    <>
      <div className={styles.outerMessage}>
        <div className={styles.userDetail}>
          <i className="las la-angle-left" onClick={handleActive}/>
          <div className={styles.text}>
            <figure>
              <img src={sender.image || '/profile.png'} alt="" />
            </figure>
            <h4>{sender.name}</h4>
          </div>
        </div>
        <ul className={styles.messageList}>
          {messageList}
        </ul>
        <form action="" className={styles.messageFrom} onSubmit={handleSubmit}>
          <button type="button" className={styles.newButton} onClick={newChat}><i className="lab la-rocketchat" /></button>
          <input onChange={handleChange} type="text" placeholder="Send a message" />
          <button type="submit" className={styles.sendButton}><i className="lar la-paper-plane" /></button>
        </form>
        <div ref={endDiv} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const MessageConnected = connect(mapStateToProps, null)(Message);

export default MessageConnected;

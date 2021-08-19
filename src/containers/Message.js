import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import { Image, Transformation } from 'cloudinary-react';
import PropTypes from 'prop-types';
import BackendAPI from '../core/services/api';

const Message = (props) => {
  const {
    conversation, currentUser, styles,
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
    const dateTime = time ? DateTime.fromISO(time).toLocal().c : '';

    return (
      <li
        key={message.id}
        className={
          message.user_id === currentUser.id
            ? styles.currentUserMessage : styles.senderMessage
        }
      >
        <p className={styles.messageText}>{message.text}</p>
        <span className={styles.messageTime}>{`${dateTime.hour}:${dateTime.minute}`}</span>
      </li>
    );
  });

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.target.firstElementChild.value = '';
    e.preventDefault();
    BackendAPI.createMessage(text, conversation.id, currentUser.id).then((res) => res);
  };

  const sender = conversation.users.find((user) => user.id !== currentUser.id);
  if (!sender) {
    return null;
  }

  return (
    <>

      <div className={styles.userDetail}>
        <div className={styles.text}>
          <figure>

            <Image cloudName="dfsniizqr" publicId={sender.image}>
              <Transformation gravity="face" height="100" width="100" crop="fill" />
            </Image>

          </figure>
          <span>{sender.name}</span>
        </div>
      </div>
      <ul className={styles.messageList}>

        {messageList}
        <li ref={endDiv} />
      </ul>
      <form action="" className={styles.messageForm} onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" placeholder="Send a message" />
        <button type="submit" aria-label="send message" className={styles.sendButton}>
          <i className="lar la-paper-plane" />
        </button>
      </form>
    </>
  );
};

Message.propTypes = {
  conversation: PropTypes.instanceOf(Object).isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,

};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const MessageConnected = connect(mapStateToProps, null)(Message);

export default MessageConnected;

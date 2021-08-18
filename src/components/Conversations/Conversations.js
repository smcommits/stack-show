import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import BackendAPI from '../../core/services/api';
import styles from '../../stylesheets/Conversations.module.scss';
import { fetchConversations, addMessages } from '../../reducers/conversationReducer';
import {
  subcribeToMessageChannel,
  subcribeToConversationChannel,
  unsubscribeToMessageChannel,
} from '../../core/helpers/ConversationHelper';
import MessageCable from './MessageCable';
import ActionCableManager from '../../core/helpers/actionCableHelper';
import FindUser from './FindUser';
import ConversationsList from './ConversationsList';
import Cable from './Cable';

const Conversations = (props) => {
  const {
    conversations, getAllConversations, addConversation, addMessage, currentUser, generateName,
  } = props;

  const [activeConversation, setActiveConversation] = useState({});
  const [active, setActiveIndex] = useState(0);
  const [findUser, setFindUser] = useState(false);

  const handleReceived = (response) => {
    const { conversation } = response;
    addConversation(conversation);
    setActiveConversation(conversation.id);
  };

  const handleReceivedMessage = (response) => {
    const { message } = response;
    addMessage(message);
  };

  useEffect(() => {
    getAllConversations();
    generateName('Conversations');
  }, []);

  useEffect(() => {
    const conversationChannel = subcribeToConversationChannel(handleReceived);
    const messageChannels = subcribeToMessageChannel(conversations, handleReceivedMessage);

    return function cleanup() {
      conversationChannel.unsubscribe();
      unsubscribeToMessageChannel(messageChannels);
    };
  });

  const handleConversation = (title, sender_id, reciever_id) => {
    setFindUser(false);
    BackendAPI.startConversation(title, sender_id, reciever_id)
      .then((res) => {
      });
  };

  const findActiveConversation = () => conversations.find(
    (conversation) => conversation.id === activeConversation,
  );

  return (
    <>
      <section className={styles.main}>
        {findUser
        && (
        <FindUser
          findUser={setFindUser}
          handleConversation={handleConversation}
          currentUser={currentUser}
        />
        )}
        <div className={styles.inner}>
          <section className={`${styles.conversationMain} ${styles.swipe}`}>
            <ConversationsList
              setActive={setActiveConversation}
              conversations={conversations}
              styles={styles}
              setActiveIndex={setActiveIndex}
              currentUser={currentUser}
              findUser={setFindUser}
            />
          </section>
          <section className={`${styles.messageMain} ${styles.swipe}`}>
            <Message
              conversation={findActiveConversation()}
              handleReceived={handleReceivedMessage}
              styles={styles}
              setActiveIndex={setActiveIndex}
            />
          </section>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  conversations: state.conversations,
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getAllConversations: () => {
    dispatch(fetchConversations());
  },
  addConversation: (conversation) => {
    dispatch({ type: 'ADD_CONVERSATION', payload: conversation });
  },
  addMessage: (message) => {
    dispatch(addMessages(message));
  },
  generateName: (name) => {
    dispatch({ type: 'COMPONENT_NAME', payload: name });
  },
});

const ConversationsConnected = connect(mapStateToProps, mapDispatchToProps)(Conversations);

export default ConversationsConnected;

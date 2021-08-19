import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message';
import BackendAPI from '../core/services/api';
import styles from '../stylesheets/Conversations.module.scss';
import { fetchConversations, addMessages } from '../reducers/conversationReducer';
import conversationExists from '../components/helpers/conversationComponentHelper';
import {
  subcribeToMessageChannel,
  subcribeToConversationChannel,
  unsubscribeToMessageChannel,
} from '../core/helpers/ConversationHelper';
import FindUser from '../components/conversation/FindUser';
import ConversationsList from '../components/conversation/ConversationsList';

const Conversations = (props) => {
  const {
    conversations,
    getAllConversations,
    addConversation,
    addMessage,
    currentUser,
    generateName,
  } = props;

  const [activeConversation, setActiveConversation] = useState({});
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
    generateName('conversations');
  }, []);

  useEffect(() => {
    const conversationChannel = subcribeToConversationChannel(handleReceived);
    const messageChannels = subcribeToMessageChannel(conversations, handleReceivedMessage);
    return function cleanup() {
      conversationChannel.unsubscribe();
      unsubscribeToMessageChannel(messageChannels);
    };
  });

  const handleConversation = (title, senderId, recieverId) => {
    setFindUser(false);
    const conversation = conversationExists(conversations, senderId, recieverId);
    if (conversation) {
      setActiveConversation(conversation.id);
      return null;
    }
    BackendAPI.startConversation(title, senderId, recieverId)
      .then((res) => res);
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
              currentUser={currentUser}
              findUser={setFindUser}
            />
          </section>
          <section className={`${styles.messageMain} ${styles.swipe}`}>
            <Message
              conversation={findActiveConversation()}
              handleReceived={handleReceivedMessage}
              styles={styles}
            />
          </section>
        </div>
      </section>
    </>
  );
};

Conversations.propTypes = {
  conversations: PropTypes.instanceOf(Object).isRequired,
  getAllConversations: PropTypes.func.isRequired,
  addConversation: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
  generateName: PropTypes.func.isRequired,
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

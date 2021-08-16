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

import ConversationsList from './ConversationsList';
import Cable from './Cable';

const Conversations = (props) => {
  const {
    conversations, getAllConversations, addConversation, addMessage,
  } = props;

  const [activeConversation, setActiveConversation] = useState({});
  const [active, setActive] = useState(false);

  const handleReceived = (response) => {
    const { conversation } = response;
    addConversation(conversation);
  };

  const handleReceivedMessage = (response) => {
    const { message } = response;
    addMessage(message);
    // setConversations(conversationsNew);
    // setConversationLength(conversationsLength + 1)
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  const connectedCall = () => {
    console.log('Iam connected');
  };

  useEffect(() => {
    const conversationChannel = subcribeToConversationChannel(handleReceived);
    const messageChannels = subcribeToMessageChannel(conversations, handleReceivedMessage);
    console.log(messageChannels);

    return function cleanup() {
      conversationChannel.unsubscribe();
      unsubscribeToMessageChannel(messageChannels);
    };
  });

  const findActiveConversation = () => conversations.find(
    (conversation) => conversation.id === activeConversation,
  );

  return (
    <>
      <section className={styles.main}>
        <div className={styles.inner}>
          <ConversationsList
            setActive={setActiveConversation}
            conversations={conversations}
            styles={styles}
            className={styles.translateItems}
          />
          <Message
            conversation={findActiveConversation()}
            handleReceived={handleReceivedMessage}
            styles={styles}
            className={styles.translateItems}
          />
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  conversations: state.conversations,
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
});

const ConversationsConnected = connect(mapStateToProps, mapDispatchToProps)(Conversations);

export default ConversationsConnected;

import React, { useEffect, useState } from 'react';
import Message from './Message';
import BackendAPI from '../../core/services/api';
import styles from '../../stylesheets/Conversations.module.scss';
import {
  subcribeToMessageChannel,
  subcribeToConversationChannel,
  addSubscriptionToMessage,
} from '../../core/helpers/ConversationHelper';

import ConversationsList from './ConversationsList';

const Conversations = (props) => {
  const [activeConversation, setActiveConversation] = useState({});
  const [conversations, setConversations] = useState([]);
  const [conversationsLength, setConversationLength] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const handleReceived = (response) => {
    const { conversation } = response;
    setConversations([...conversations, conversation]);
  };

  console.log('i am running');

  const appendRecievedMessage = (message) => {
    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id,
    );
    conversation.messages.push(message);
  };

  const handleReceivedMessage = (response) => {
    const { message } = response;
    console.log(response);

    return null;

    // setConversations(conversationsNew);
    // setConversationLength(conversationsLength + 1)
  };

  useEffect(() => {
    BackendAPI.allConversations()
      .then((res) => {
        setConversations(res.data);
        setActiveConversation(res.data[0].id);
      });
  }, []);

  const connectedCall = () => {
    console.log('Iam connected');
  };

  useEffect(() => {
    subcribeToConversationChannel(handleReceived);
    addSubscriptionToMessage(activeConversation, handleReceivedMessage, connectedCall);
    console.log();
    // subcribeToMessageChannel(conversations, handleReceivedMessage);
  });

  const findActiveConversation = () => conversations.find(
    (conversation) => conversation.id === activeConversation,
  );

  return (
    <>
      <ConversationsList
        setActive={setActiveConversation}
        conversations={conversations}
        styles={styles}
      />
      <Message
        conversation={findActiveConversation()}
        handleReceived={handleReceivedMessage}
        styles={styles}
      />
    </>
  );
};

export default Conversations;

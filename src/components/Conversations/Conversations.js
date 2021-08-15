import React, { useEffect, useState } from 'react';
import Message from './Message';
import BackendAPI from '../../core/services/api';
import styles from '../../stylesheets/Conversations.module.scss';
import ActionCableManager from '../../core/helpers/actionCableHelper';
import ConversationsList from './ConversationsList';

const Conversations = (props) => {
  const [activeConversation, setActiveConversation] = useState({});
  const [conversations, setConversations] = useState([]);
  console.log(activeConversation);
  console.log(conversations);
  const handleReceived = (response) => {
    const { conversation } = response;
    setConversations([...conversations, conversation]);
  };

  const addSubscriptionToMessage = (conversation) => {
    ActionCableManager.createSubscription({
      channel: 'MessagesChannel',
      recievedCallback: handleReceivedMessage,
      params: { conversation: conversation.id },
    });
  };

  const handleReceivedMessage = (response) => {
    const { message } = response;
    console.log(response)
    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id,
    );
    conversation.messages = [...conversation.messages, message];
    setConversations(conversations);
  };
  const mapMessageListener = () => {
    conversations.forEach((conversation) => {
      addSubscriptionToMessage(conversation);
    });
  };

  mapMessageListener();

  useEffect(() => {
    ActionCableManager.createSubscription({ channel: 'ConversationsChannel', recievedCallback: handleReceived });
    BackendAPI.allConversations()
      .then((res) => {
        setConversations(res.data);
        setActiveConversation(res.data[0].id);
      });
  }, []);

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

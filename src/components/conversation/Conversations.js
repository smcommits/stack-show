import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getConsumer } from '../../helpers/actionCable';
import Message from './children/Message';
import { withAuth } from '../common';
import {
  conversationSubscriptionExists, subcribeToConversationChannel, subcribeToMessageChannel,
} from './helpers/conversationCable';
import BackendAPI from '../../services/services/api';
import {
  generateName, addConversation, addMessages, fetchConversations,
} from '../../state/actions';
import styles from '../../stylesheets/Conversations.module.scss';
import ConversationsList from './children/ConversationsList';
import FindUser from './children/FindUser';
import conversationExists from './helpers/conversationComponentHelper';
import PleaseLogin from '../common/PleaseLogin';

const Conversations = ({ authenticated }) => {
  if (!authenticated) return <PleaseLogin text="Please login to start a conversation." />;
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  const currentUser = useSelector((state) => state.session.currentUser);
  const consumer = getConsumer();

  const [activeConversation, setActiveConversation] = useState({});
  const [findUser, setFindUser] = useState(false);

  const handleReceived = (response) => {
    const { conversation } = response;
    dispatch(addConversation(conversation));
    setActiveConversation(conversation.id);
  };

  const handleReceivedMessage = (response) => {
    const { message } = response;
    dispatch(addMessages(message));
  };

  useEffect(() => {
    dispatch(fetchConversations());
    dispatch(generateName('conversations'));
  }, []);

  useEffect(() => {
    if (!conversationSubscriptionExists(consumer)) {
      subcribeToConversationChannel(consumer, handleReceived);
    }

    subcribeToMessageChannel(consumer, conversations, handleReceivedMessage);
  });

  const handleConversation = (title, senderId, recieverId) => {
    setFindUser(false);
    const conversation = conversationExists(conversations, senderId, recieverId);
    if (conversation) {
      setActiveConversation(conversation.id);
      return null;
    }
    return BackendAPI.startConversation(title, senderId, recieverId)
      .then((res) => res);
  };

  const findActiveConversation = () => conversations.find(
    (conversation) => conversation.id === activeConversation,
  );

  const conversation = (
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
            currentUser={currentUser}
            styles={styles}
          />
        </section>
      </div>
    </section>
  );

  return (
    <>
      {authenticated ? conversation
        : (
          <div>
            <p>Please login to view conversations.</p>
            <Link to="/login">Login</Link>
          </div>
        )}
    </>
  );
};

export default withAuth(Conversations);

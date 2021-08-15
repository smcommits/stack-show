import React, { useEffect, useState } from 'react';
import ConversationsList from './ConversationsList';
import Messages from './Message';

const Conversations = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [activeConversations, setActiveConversations] = useState({});

  return (
    <>
      <ConversationsList setActive={setActiveConversations} />
      <Messages conversation={activeConversations} />
    </>
  );
};

export default Conversations;

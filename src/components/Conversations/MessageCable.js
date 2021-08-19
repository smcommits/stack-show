import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const MessageCable = (props) => {
  const { handleReceived, conversations } = props;

  return (
    <>
      {conversations.map((conversation) => (
        <ActionCableConsumer
          key={conversation.id}
          channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
          onReceived={handleReceived}
        />
      ))}
    </>
  );
};

export default MessageCable;

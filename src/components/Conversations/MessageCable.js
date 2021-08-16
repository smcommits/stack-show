import React from 'react';
import Cable from './Cable';

const MessageCable = (props) => {
  const { channelName, handleReceived, conversations } = props;

  return (
    <>
      {conversations.map((conversation) => (
        <Cable
          key={conversation.id}
          channelName={channelName}
          onRecieved={handleReceived}
          params={{ conversation: conversation.id }}
        />
      ))}
    </>
  );
};

export default MessageCable;

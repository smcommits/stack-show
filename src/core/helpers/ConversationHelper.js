import ActionCableManager from './actionCableHelper';

const addSubscriptionToMessage = (
  conversation,
  callback,
  connectedCallback,
) => ActionCableManager.createSubscription({
  channel: 'MessagesChannel',
  recievedCallback: callback,
  connectedCallback,
  params: { conversation: conversation.id },
});

const subcribeToConversationChannel = (
  callback,
) => ActionCableManager.createSubscription(
  { channel: 'ConversationsChannel', recievedCallback: callback },
);

const subcribeToMessageChannel = (
  conversations,
  callback,
) => conversations.map((conversation) => addSubscriptionToMessage(conversation, callback));

const unsubscribeToMessageChannel = (channels) => {
  channels.forEach((channel) => channel.unsubscribe());
};

export {
  subcribeToMessageChannel,
  subcribeToConversationChannel,
  addSubscriptionToMessage,
  unsubscribeToMessageChannel,
};

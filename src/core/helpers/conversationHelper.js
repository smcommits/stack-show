import ActionCableManager from '../services/actionCable';

const addSubscriptionToMessage = (
  conversation,
  callback,
  connectedCallback,
  disconnectedCallback,
) => ActionCableManager.createSubscription({
  channel: 'MessagesChannel',
  recievedCallback: callback,
  connectedCallback,
  disconnectedCallback,
  params: { conversation: conversation.id },
});

const subcribeToConversationChannel = (
  callback,
  connectedCallback,
  disconnectedCallback,
) => ActionCableManager.createSubscription(
  {
    channel: 'ConversationsChannel', recievedCallback: callback, connectedCallback, disconnectedCallback,
  },
);

const subcribeToMessageChannel = (
  conversations,
  callback,
  connectedCallback,
  disconnectedCallback,
) => conversations.map((conversation) => {
  if (ActionCableManager.isSubscribedMessage(conversation.id).length) return null;
  return addSubscriptionToMessage(conversation, callback, connectedCallback, disconnectedCallback);
});

const unsubscribeToMessageChannel = (channels) => {
  channels.forEach((channel) => channel.unsubscribe());
};

const convSubExists = () => ActionCableManager.isSubscribedConversation().length;

export {
  subcribeToMessageChannel,
  subcribeToConversationChannel,
  addSubscriptionToMessage,
  unsubscribeToMessageChannel,
  convSubExists,
};

import { ActionCableManager } from '../../../services';

const isSubscribedConversation = (consumer) => consumer.subscriptions.subscriptions.filter(
  (sub) => JSON.parse(sub.identifier).channel === 'ConversationsChannel',
);

const isSubscribedMessage = (
  consumer, conversationID,
) => consumer.subscriptions.subscriptions.filter(
  (sub) => {
    const parsed = JSON.parse(sub.identifier);
    return parsed.channel === 'MessagesChannel' && parsed.conversation === conversationID;
  },
);

const addSubscriptionToMessage = (
  consumer,
  conversation,
  callback,
  connectedCallback,
  disconnectedCallback,
) => ActionCableManager.createSubscription({
  consumer,
  channel: 'MessagesChannel',
  recievedCallback: callback,
  connectedCallback,
  disconnectedCallback,
  params: { conversation: conversation.id },
});

const subcribeToConversationChannel = (
  consumer,
  callback,
  connectedCallback,
  disconnectedCallback,
) => ActionCableManager.createSubscription({
  consumer,
  channel: 'ConversationsChannel',
  recievedCallback: callback,
  connectedCallback,
  disconnectedCallback,
});

const subcribeToMessageChannel = (
  consumer,
  conversations,
  callback,
  connectedCallback,
  disconnectedCallback,
) => conversations.map((conversation) => {
  if (isSubscribedMessage(consumer, conversation.id).length) return null;
  return addSubscriptionToMessage(
    consumer, conversation, callback, connectedCallback, disconnectedCallback,
  );
});

const unsubscribeToMessageChannel = (channels) => {
  channels.forEach((channel) => channel.unsubscribe());
};

const conversationSubscriptionExists = (consumer) => isSubscribedConversation(consumer).length;
export {
  subcribeToMessageChannel,
  subcribeToConversationChannel,
  addSubscriptionToMessage,
  unsubscribeToMessageChannel,
  conversationSubscriptionExists,
};

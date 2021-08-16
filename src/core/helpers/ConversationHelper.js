import ActionCableManager from './actionCableHelper';

const addSubscriptionToMessage = (conversation, callback, connectedCallback) => {
  ActionCableManager.createSubscription({
    channel: 'MessagesChannel',
    recievedCallback: callback,
    connectedCallback: connectedCallback,
    params: { conversation: conversation },
  });
};

const subcribeToConversationChannel = (callback) => {
  ActionCableManager.createSubscription({ channel: 'ConversationsChannel', recievedCallback: callback });
};

const subcribeToMessageChannel = (conversations, callback) => {
  conversations.map((conversation) => {
    addSubscriptionToMessage(conversation, callback);
    return null;
  });
};

export { subcribeToMessageChannel, subcribeToConversationChannel, addSubscriptionToMessage };

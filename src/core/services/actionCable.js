import ActionCable from 'actioncable';

const ActionCableManager = (() => {
  const authHeaders = () => JSON.parse(localStorage.getItem('user'));

  if (!authHeaders()) return null;

  const cable = ActionCable.createConsumer(
    `${process.env.REACT_APP_WS_URI}?uid=${authHeaders().uid}&token=${authHeaders()['access-token']}&client=${authHeaders().client}`,
  );

  const isSubscribedConversation = () => cable.subscriptions.subscriptions.filter(
    (sub) => JSON.parse(sub.identifier).channel === 'ConversationsChannel',
  );

  const isSubscribedMessage = (conversationID) => cable.subscriptions.subscriptions.filter(
    (sub) => {
      const parsed = JSON.parse(sub.identifier);
      return parsed.channel === 'MessagesChannel' && parsed.conversation === conversationID;
    },
  );

  const createSubscription = ({
    channel = '',
    connectedCallback = null,
    recievedCallback = null,
    disconnectedCallback = null,
    rejectedCallback = null,
    params = {},
  } = {}) => cable.subscriptions.create(
    { channel, ...params },
    {
      connected: connectedCallback,
      received: recievedCallback,
      disconnected: disconnectedCallback,
      rejected: rejectedCallback,
    },
  );

  return {
    cable,
    createSubscription,
    isSubscribedConversation,
    isSubscribedMessage,
  };
})();

export default ActionCableManager;

const ActionCableManager = (() => {
  const createSubscription = ({
    consumer,
    channel = '',
    connectedCallback = null,
    recievedCallback = null,
    disconnectedCallback = null,
    rejectedCallback = null,
    params = {},
  } = {}) => consumer.subscriptions.create(
    { channel, ...params },
    {
      connected: connectedCallback,
      received: recievedCallback,
      disconnected: disconnectedCallback,
      rejected: rejectedCallback,
    },
  );

  return {
    createSubscription,
  };
})();

export default ActionCableManager;

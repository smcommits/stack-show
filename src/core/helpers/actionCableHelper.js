import ActionCable from 'actioncable';

const ActionCableManager = (() => {
  const cable = ActionCable.createConsumer('wss://stack-show-back.herokuapp.com/cable');

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
  };
})();

export default ActionCableManager;

import ActionCable from 'actioncable';

const ActionCableManager = (() => {
  const cable = ActionCable.createConsumer('ws://localhost:5000/cable');

  const createSubscription = ({
    channel = '',
    connectedCallback = null,
    recievedCallback = null,
    disconnectedCallback = null,
    rejectedCallback = null,
  } = {}) => {
    cable.subscriptions.create(
      channel,
      {
        connected: connectedCallback,
        received: recievedCallback,
        disconnected: disconnectedCallback,
        rejected: rejectedCallback,
      },
    );
  };

  return {
    createSubscription,
  };
})();

export default ActionCableManager;

import ActionCable from 'actioncable';

const ActionCableManager = (() => {
  const authHeaders = () => JSON.parse(localStorage.getItem('user'));

  const cable = ActionCable.createConsumer(
    `${process.env.REACT_APP_WS_URI}?uid=${authHeaders().uid}&token=${authHeaders()['access-token']}&client=${authHeaders().client}`,
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
  };
})();

export default ActionCableManager;

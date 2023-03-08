import ActionCable from 'actioncable';

let consumer;

const authHeaders = () => JSON.parse(localStorage.getItem('user'));
// eslint-disable-next-line import/prefer-default-export
export const getConsumer = () => {
  if (!consumer) {
    consumer = ActionCable.createConsumer(
      `${process.env.REACT_APP_WS_URI}?uid=${authHeaders().uid}&token=${authHeaders()['access-token']}&client=${authHeaders().client}`,
    );
  }
  return consumer;
};

import React from 'react';
import ActionCableManager from '../../core/helpers/actionCableHelper';

const Cable = (props) => {
  const { channelName, params, onRecieved } = props;
  console.log(channelName)
  console.log(params)
  ActionCableManager.createSubscription({
    channel: channelName,
    recievedCallback: onRecieved,
    params,
  });

  return (
    <>
    </>
  );
};
export default Cable;

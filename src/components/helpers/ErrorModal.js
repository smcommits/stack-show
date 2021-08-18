import React from 'react';

const ErrorModal = (props) => {
  const { error, errorHeader, errorMessage } = props;

  if (!error) return null;

  return (
    <div className="errorModal">
      <h4>{errorMessage}</h4>
      <p>{errorText}</p>
    </div>
  );
};

export default ErroErrorModalModal;

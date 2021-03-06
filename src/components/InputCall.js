import React from 'react';
import PropTypes from 'prop-types';

const InputCall = (props) => {
  const { fileInputRef, styles, fileHandler } = props;
  return (
    <>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={fileHandler} />
      <div className={styles.uploadCall}>
        <img src="/upload.png" alt="" />
        <div className={styles.uploadText}>
          Drag and drop an image, or
          {' '}
          <span>Upload</span>
        </div>
      </div>
    </>
  );
};

InputCall.propTypes = {
  fileInputRef: PropTypes.instanceOf(Object).isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  fileHandler: PropTypes.func.isRequired,
};

export default InputCall;

import React, { useRef, useState } from 'react';

import InputCall from './InputCall';

const ImageUpload = (props) => {
  const { fileHandler, setImageUpload, styles } = props;
  const [dragging, setDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const dragRef = useRef();
  const fileInputRef = useRef();

  const openFileInput = () => {
    if (fileInputRef.current === null) return;
    fileInputRef.current.click();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileRemove = () => {
    setImageUpload('');
    setPreviewImage('');
  };

  const handleFile = (event) => {
    const file = event.type === 'drop' ? event.dataTransfer.files[0]
      : event.target.files[0];
    setImageUpload(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e);
    }
  };

  return (
    <>
      <div className={styles.uploadMain}>
        <div
          className={`${styles.uploadContainer} ${dragging && styles.dragZone}`}
          onClick={openFileInput}
          ref={dragRef}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDragDrop}
        >
          {previewImage
          && (
          <div className={styles.previewContainer}>
            <img src={previewImage} alt="" className={styles.previewImage} />
            <i className={`las la-trash-alt ${styles.previewRemover}`} onClick={handleFileRemove} />
          </div>
          )}
          {!previewImage && (
          <InputCall
            fileInputRef={fileInputRef}
            styles={styles}
            fileHandler={handleFile}
          />
          )}

        </div>
      </div>
    </>
  );
};

export default ImageUpload;

import React, { useRef, useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import Cloudinary from '../../core/services/cloudinary';
import BackendAPI from '../../core/services/api';
import Loader from './Loader';

const UserDetails = (props) => {
  const {
    styles, imagePath, name, id, updateImage,
  } = props;
  const [imageUpload, setImageUpload] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const openFileInput = () => {
    if (fileInputRef.current === null) return;
    fileInputRef.current.click();
  };

  const uploadImage = async (file) => {
    if (!file) return;
    const res = await Cloudinary.uploadImage(file);

    return res;
  };
  const handleFile = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    const res = await uploadImage(file);
    if (res.status === 200) {
      const response = await BackendAPI.updateUser(id, { image: res.data.secure_url });
      if (response.status === 200) {
        updateImage(res.data.secure_url);
        setLoading(false);
      }
    }
  };

  return (

    <div className={styles.userDetails}>
      <figure onClick={openFileInput}>
        <div className={styles.loader}>
          <Loader
            loading={loading}
            propStyles={{
              width: '5px',
              height: '5px',
              margin: '2px',
            }}
          />
        </div>
        {(imagePath
          && (
          <Image cloudName="dfsniizqr" publicId={imagePath}>
            <Transformation gravity="face" height="50" width="50" crop="fill" />
          </Image>
          ))
            || <img src="/profile.png" alt="user" />}

      </figure>
      <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFile} />
    </div>
  );
};

export default UserDetails;

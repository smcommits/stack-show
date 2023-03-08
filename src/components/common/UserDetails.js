import React, { useRef, useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Cloudinary, BackendAPI } from '../../services';
import { updateUserImage } from '../../state/actions/user';
import Loader from './Loader';

const UserDetails = (props) => {
  const {
    styles, imagePath, name, id,
  } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const openFileInput = () => {
    if (fileInputRef.current === null) return;
    fileInputRef.current.click();
  };
  const loaderStyles = {
    width: '5px',
    height: '5px',
    margin: '2px',
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const res = await Cloudinary.uploadImage(file);
    return res;
  };
  const handleFile = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    const res = await uploadImage(file);
    if (res.status === 200) {
      const response = await BackendAPI.updateUser(id, { image: res.data.public_id });
      if (response.status === 200) {
        dispatch(updateUserImage(res.data.public_id));
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className={styles.userDetails}>
        <figure onClick={openFileInput} role="presentation">
          <div className={styles.loader}>
            <Loader loading={loading} propStyles={loaderStyles} />
          </div>
          {(imagePath && (
          <Image cloudName="dfsniizqr" publicId={imagePath}>
            <Transformation gravity="face" height="100" width="100" crop="fill" />
          </Image>
          )) || <img src="/profile.png" alt="user" />}
        </figure>
        <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFile} />
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  imagePath: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  updateImage: PropTypes.func.isRequired,
};

UserDetails.defaultProps = {
  imagePath: '',
};

export default UserDetails;

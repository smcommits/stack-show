import axios from 'axios';
import RequestClients from '../clients/index';

const Cloudinary = (() => {
  const baseConfig = {
    cloudName: process.env.REACT_APP_CLOUD_NAME,
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    timestamp: Math.round(new Date().getTime() / 1000),
  };

  const endPoints = {
    sigURI: '/cloud/sig/new',
    uploadEndpoint: `https://api.cloudinary.com/v1_1/${baseConfig.cloudName}/image/upload`,
  };

  const getSignature = async () => {
    try {
      const res = await RequestClients.rootClient.get(`${endPoints.sigURI}`,
        {
          params: {
            timestamp: baseConfig.timestamp,
            upload_preset: 'mqymjapp',
          },
        });
      return res.data.sig;
    } catch (err) {
      if (err.response) {
        return err.response;
      }
      return err;
    }
  };

  const uploadImage = async (file) => {
    const signature = await getSignature();

    const data = new FormData();
    data.append('api_key', baseConfig.apiKey);
    data.append('timestamp', baseConfig.timestamp);
    data.append('file', file);
    data.append('signature', signature);
    data.append('upload_preset', 'mqymjapp');

    const res = await axios.post(endPoints.uploadEndpoint, data, { withCredentials: false });

    return res;
  };
  return {
    uploadImage,
  };
})();

export default Cloudinary;

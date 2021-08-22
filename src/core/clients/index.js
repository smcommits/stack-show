import axios from 'axios';

import LocalStorageHelper from '../helpers/localStorageHelpe';

const RequestClients = (() => {
  // helpers
  const authHeaders = () => JSON.parse(localStorage.getItem('user'));

  const attachHeaders = (config) => {
    const headers = authHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        config.headers[key] = headers[key];
      });
    }
  };

  // rootClient
  const rootClient = axios.create({
    baseURL: process.env.REACT_APP_ROOT_URI,
    params: {},
  });

  rootClient.interceptors.request.use((config) => {
    attachHeaders(config);
    return config;
  }, (err) => Promise.reject(err));

  rootClient.interceptors.response.use((response) => {
    LocalStorageHelper.parseAndSaveAuthInfo(response.headers);
    return response;
  });

  // authClient
  const authClient = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URI,
    params: {},
  });

  authClient.interceptors.request.use((config) => {
    attachHeaders(config);
    return config;
  }, (err) => Promise.reject(err));

  authClient.interceptors.response.use((response) => {
    LocalStorageHelper.parseAndSaveAuthInfo(response.headers);
    return response;
  });

  return {
    rootClient,
    authClient,
  };
})();

export default RequestClients;

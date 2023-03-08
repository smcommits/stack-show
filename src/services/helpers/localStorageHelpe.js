const LocalStorageHelper = (() => {
  const parseAndSaveAuthInfo = (headers) => {
    if (headers['access-token']) {
      const authInfo = {
        'access-token': headers['access-token'],
        client: headers.client,
        expiry: headers.expiry,
        'token-type': headers['token-type'],
        uid: headers.uid,
      };

      localStorage.setItem('user', JSON.stringify(authInfo));
    }
    return null;
  };

  const removeAuthHeaders = () => localStorage.removeItem('user');

  return {
    parseAndSaveAuthInfo,
    removeAuthHeaders,
  };
})();

export default LocalStorageHelper;

/* eslint-disable react/jsx-props-no-spreading */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateUser } from '../../state/actions';
import Loader from './Loader';

const withAuth = (WrappedComponent, redirect = false) => {
  const AuthenticatedComponent = (props) => {
    const authenticated = useSelector((state) => state.session.authenticated);
    const isLoading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(validateUser);
    }, []);
    if (isLoading) {
      return <Loader loading={isLoading} />;
    }

    if (!authenticated && redirect) {
      return <Redirect to="/login" />;
    }
    return <WrappedComponent authenticated={authenticated} {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

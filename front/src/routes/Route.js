import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../services/api';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const token = useSelector(store => store.auth.token);

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  const userIsLogged = useSelector(store => store.auth.loggedIn);

  if (!userIsLogged && isPrivate) {
    return <Redirect to="/" />;
  }

  if (userIsLogged && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = userIsLogged ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

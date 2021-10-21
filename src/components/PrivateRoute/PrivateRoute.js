/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Route, Redirect,
} from 'react-router-dom';
import { useAuth } from '../../providers/auth';

function PrivateRoute({ component: Component, type, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => (user.type === type ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ))}
    />
  );
}

export default PrivateRoute;

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLocation } from 'containers/App/selectors';

export const ProtectedRoute = ({
  allow,
  redirect,
  component: Component,
  ...rest
}) => {
  const isAllowed = typeof allow === 'function' ? allow() : allow;
  return (
    <Route
      {...rest}
      render={props =>
        isAllowed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  allow: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  location: PropTypes.object,
  redirect: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(ProtectedRoute);

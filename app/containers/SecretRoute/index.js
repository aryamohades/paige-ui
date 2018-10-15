import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectIsAuthenticated,
  makeSelectLocation,
} from 'containers/App/selectors';

const SecretRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            search: `?next=${props.location.pathname}`,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

SecretRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  location: makeSelectLocation(),
});

export default connect(mapStateToProps)(SecretRoute);

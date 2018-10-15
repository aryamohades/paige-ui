import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectIsAuthenticated } from 'containers/App/selectors';

const AnonRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Redirect to="/profile" /> : <Component {...props} />
    }
  />
);

AnonRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

export default connect(mapStateToProps)(AnonRoute);

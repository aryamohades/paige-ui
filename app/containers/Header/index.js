import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { APP_BRAND } from 'containers/App/constants';
import { makeSelectIsAuthenticated } from 'containers/App/selectors';
import Header from 'components/Header';

export const AppHeader = ({ isAuthenticated }) => {
  const left = [
    {
      text: 'Docs',
      to: '/docs',
      id: 'docs',
      type: 'link',
    },
    { text: 'Library', to: '/library', id: 'library', type: 'link' },
  ];

  const authItems = [];

  const anonItems = [
    {
      text: 'Login',
      to: '/login',
      id: 'login',
      type: 'link',
    },
    {
      id: 'register',
      to: '/register',
      text: 'Register',
      type: 'button',
      primary: true,
    },
  ];

  const headerProps = {
    brandText: APP_BRAND,
    left,
    right: isAuthenticated ? authItems : anonItems,
  };

  return <Header {...headerProps} />;
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
};

/* istanbul ignore next */
const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

export default connect(mapStateToProps)(AppHeader);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectIsAuthenticated } from 'containers/App/selectors';
import Header from 'components/Header';

const AppHeader = ({ isAuthenticated }) => {
  const left = [
    {
      text: 'Technologies',
      to: '/technologies',
      id: 'technologies',
      type: 'link',
    },
    { text: 'Companies', to: '/companies', id: 'companies', type: 'link' },
    { text: 'Jobs', to: '/jobs', id: 'jobs', type: 'link' },
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
    brandText: 'warehouse',
    left,
    right: isAuthenticated ? authItems : anonItems,
  };

  return <Header {...headerProps} />;
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

export default connect(mapStateToProps)(AppHeader);

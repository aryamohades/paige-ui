/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';

import ProtectedRoute from 'containers/ProtectedRoute';
import AppHeader from 'containers/Header';
import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';
import { makeSelectIsAuthenticated } from './selectors';
import { APP_NAME, META_DESCRIPTION } from './constants';

const AppWrapper = styled.div`
  flex: 1;
  display: flex;
  min-height: 100%;
  padding: 0 0px;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const App = ({ isAuthenticated }) => (
  <AppWrapper>
    <Helmet titleTemplate={`%s - ${APP_NAME}`} defaultTitle={APP_NAME}>
      <meta name="description" content={META_DESCRIPTION} />
    </Helmet>
    <AppHeader />
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <ProtectedRoute
          exact
          path="/login"
          redirect="/"
          allow={!isAuthenticated}
          component={LoginPage}
        />
        <ProtectedRoute
          exact
          path="/profile"
          redirect="/login"
          allow={isAuthenticated}
          component={ProfilePage}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </PageWrapper>
    <Footer />
  </AppWrapper>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

export default withRouter(connect(mapStateToProps)(App));

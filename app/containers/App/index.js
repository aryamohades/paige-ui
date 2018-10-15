/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import SecretRoute from 'containers/SecretRoute';
import AppHeader from 'containers/Header';
import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';

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

const App = () => (
  <AppWrapper>
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <AppHeader />
    <PageWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <SecretRoute exact path="/profile" component={ProfilePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </PageWrapper>
    <Footer />
  </AppWrapper>
);

export default App;

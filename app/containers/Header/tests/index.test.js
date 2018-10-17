import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppHeader } from '../index';

describe('<AppHeader />', () => {
  it('should match the snapshot if user is not authenticated', () => {
    const renderedComponent = renderer
      .create(
        <Router>
          <AppHeader />
        </Router>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should match the snapshot if user is authenticated', () => {
    const renderedComponent = renderer
      .create(
        <Router>
          <AppHeader isAuthenticated />
        </Router>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});

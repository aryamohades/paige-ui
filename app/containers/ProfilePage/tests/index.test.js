import React from 'react';
import renderer from 'react-test-renderer';

import { ProfilePage } from '../index';

describe('<AppHeader />', () => {
  it('should match the snapshot if user is not authenticated', () => {
    const renderedComponent = renderer.create(<ProfilePage />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});

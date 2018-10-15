import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../index';
import messages from '../messages';

describe('<HomePage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.contains(<span>{messages.header}</span>)).toEqual(
      true,
    );
  });
});

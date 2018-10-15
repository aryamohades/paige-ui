import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderLink from '../HeaderLink';

describe('<HeaderLink />', () => {
  it('should match the snapshot', () => {
    const props = { text: 'test', to: '/' };
    const renderedComponent = renderer
      .create(
        <Router>
          <HeaderLink {...props} />
        </Router>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the correct text', () => {
    const props = { text: 'test', to: '/' };
    const renderedComponent = mount(
      <Router>
        <HeaderLink {...props} />
      </Router>,
    );
    expect(renderedComponent.find(HeaderLink).text()).toEqual(props.text);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderItem from '../HeaderItem';

describe('<HeaderItem />', () => {
  it('should match the snapshot', () => {
    const props = { text: 'test', to: '/' };
    const renderedComponent = renderer
      .create(
        <Router>
          <HeaderItem {...props} />
        </Router>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the correct text', () => {
    const props = { text: 'test', to: '/' };
    const renderedComponent = mount(
      <Router>
        <HeaderItem {...props} />
      </Router>,
    );
    expect(renderedComponent.find(HeaderItem).text()).toEqual(props.text);
  });
});

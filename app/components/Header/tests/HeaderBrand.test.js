import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderBrand from '../HeaderBrand';

describe('<HeaderBrand />', () => {
  it('should match the snapshot', () => {
    const text = 'test';
    const renderedComponent = renderer
      .create(
        <Router>
          <HeaderBrand text={text} />
        </Router>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the correct text', () => {
    const text = 'test';
    const renderedComponent = mount(
      <Router>
        <HeaderBrand text={text} />
      </Router>,
    );
    expect(renderedComponent.find(HeaderBrand).text()).toEqual(text);
  });
});

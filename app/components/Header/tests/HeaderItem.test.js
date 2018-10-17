import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderItem from '../HeaderItem';
import { ButtonLink, ButtonLinkPrimary } from '../itemStyles';

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

  it('should render a button if type is button', () => {
    const props = { text: 'test', to: '/', type: 'button' };
    const renderedComponent = mount(
      <Router>
        <HeaderItem {...props} />
      </Router>,
    );
    expect(renderedComponent.find(ButtonLink).length).toEqual(1);
  });

  it('should render a primary button if type is button and primary is true', () => {
    const props = { text: 'test', to: '/', type: 'button', primary: true };
    const renderedComponent = mount(
      <Router>
        <HeaderItem {...props} />
      </Router>,
    );
    expect(renderedComponent.find(ButtonLinkPrimary).length).toEqual(1);
  });
});

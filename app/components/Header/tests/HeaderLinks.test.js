import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderLinks from '../HeaderLinks';
import HeaderLink from '../HeaderLink';

describe('<HeaderLinks />', () => {
  it('should match the snapshot', () => {
    const links = [{ id: 1, to: '/', text: 'one' }];
    const renderedComponent = renderer
      .create(
        <Router>
          <HeaderLinks links={links} />
        </Router>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should be empty if no links are passed', () => {
    const renderedComponent = mount(
      <Router>
        <HeaderLinks />
      </Router>,
    );
    expect(renderedComponent.find(HeaderLink).length).toEqual(0);
  });

  it('should render 3 <HeaderLink /> components', () => {
    const links = [
      { id: 1, to: '/', text: 'one' },
      { id: 2, to: '/', text: 'two' },
      { id: 3, to: '/', text: 'three' },
    ];

    const renderedComponent = mount(
      <Router>
        <HeaderLinks links={links} />
      </Router>,
    );
    expect(renderedComponent.find(HeaderLink)).toHaveLength(3);
  });

  it('should pass link props to rendered component', () => {
    const links = [
      { id: 1, to: '/', text: 'one' },
      { id: 2, to: '/', text: 'two' },
    ];

    const renderedComponent = mount(
      <Router>
        <HeaderLinks links={links} />
      </Router>,
    );

    expect(
      renderedComponent
        .find(HeaderLink)
        .at(0)
        .prop('text'),
    ).toBe(links[0].text);
    expect(
      renderedComponent
        .find(HeaderLink)
        .at(1)
        .prop('text'),
    ).toBe(links[1].text);
  });
});

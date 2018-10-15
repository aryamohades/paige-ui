import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

import HeaderItems from '../HeaderItems';
import HeaderItem from '../HeaderItem';

describe('<HeaderItems />', () => {
  it('should match the snapshot', () => {
    const items = [{ id: 1, to: '/', text: 'one' }];
    const renderedComponent = renderer
      .create(
        <Router>
          <HeaderItems items={items} />
        </Router>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should be empty if no items are passed', () => {
    const renderedComponent = mount(
      <Router>
        <HeaderItems />
      </Router>,
    );
    expect(renderedComponent.find(HeaderItem).length).toEqual(0);
  });

  it('should render 3 <HeaderItem /> components', () => {
    const items = [
      { id: 1, to: '/', text: 'one' },
      { id: 2, to: '/', text: 'two' },
      { id: 3, to: '/', text: 'three' },
    ];

    const renderedComponent = mount(
      <Router>
        <HeaderItems items={items} />
      </Router>,
    );
    expect(renderedComponent.find(HeaderItem)).toHaveLength(3);
  });

  it('should pass item props to rendered component', () => {
    const items = [
      { id: 1, to: '/', text: 'one' },
      { id: 2, to: '/', text: 'two' },
    ];

    const renderedComponent = mount(
      <Router>
        <HeaderItems items={items} />
      </Router>,
    );

    expect(
      renderedComponent
        .find(HeaderItem)
        .at(0)
        .prop('text'),
    ).toBe(items[0].text);
    expect(
      renderedComponent
        .find(HeaderItem)
        .at(1)
        .prop('text'),
    ).toBe(items[1].text);
  });
});

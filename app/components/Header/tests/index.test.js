import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../index';
import NavBar from '../NavBar';
import HeaderBrand from '../HeaderBrand';
import HeaderItems from '../HeaderItems';
import HeaderItem from '../HeaderItem';

describe('<Header />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find('div').length).toEqual(2);
  });

  it('should render a <NavBar /> component', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(NavBar).length).toEqual(1);
  });

  it('should not render a <HeaderItems /> component if no items passed', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(HeaderItems).length).toEqual(0);
  });

  it('should not render one <HeaderItems /> component if left is passed', () => {
    const left = [
      { text: 'test', to: '/test', id: 'test', type: 'link' },
      { text: 'test', to: '/test', id: 'test', type: 'link' },
    ];

    const renderedComponent = shallow(<Header left={left} />);
    expect(renderedComponent.find(HeaderItems).length).toEqual(1);
  });

  it('should not render one <HeaderItems /> component if left and right are passed', () => {
    const left = [
      { text: 'test', to: '/test', id: 'test', type: 'link' },
      { text: 'test', to: '/test', id: 'test', type: 'link' },
    ];

    const right = [
      { text: 'test', to: '/test', id: 'test', type: 'link' },
      { text: 'test', to: '/test', id: 'test', type: 'link' },
    ];

    const renderedComponent = shallow(<Header left={left} right={right} />);
    expect(renderedComponent.find(HeaderItems).length).toEqual(2);
  });

  it('should render the correct number of <HeaderItem /> component', () => {
    const left = [
      { text: 'test', to: '/test', id: 'one', type: 'link' },
      { text: 'test', to: '/test', id: 'two', type: 'link' },
    ];

    const renderedComponent = mount(
      <Router>
        <Header left={left} />
      </Router>,
    );

    expect(renderedComponent.find(HeaderItem).length).toEqual(2);
  });

  it('should render a <HeaderBrand /> component if brandText is passed', () => {
    const brandText = 'test';
    const renderedComponent = shallow(<Header brandText={brandText} />);
    expect(renderedComponent.find(HeaderBrand).length).toEqual(1);
  });

  it('should not render a <HeaderBrand /> component if no brandText is passed', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(HeaderBrand).length).toEqual(0);
  });
});

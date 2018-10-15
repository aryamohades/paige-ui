import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';
import NavBar from '../NavBar';
import HeaderBrand from '../HeaderBrand';
import HeaderItems from '../HeaderItems';

describe('<Header />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find('div').length).toEqual(2);
  });

  it('should render a <NavBar /> component', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(NavBar).length).toEqual(1);
  });

  it('should render a <HeaderItems /> component', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(HeaderItems).length).toEqual(1);
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

import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';
import NavBar from '../NavBar';
import BrandText from '../BrandText';
import HeaderLinks from '../HeaderLinks';

describe('<Header />', () => {
  it('should render a <div> tag', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find('div').length).toEqual(2);
  });

  it('should render a <NavBar /> component', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(NavBar).length).toEqual(1);
  });

  it('should render a <HeaderLinks /> component', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(HeaderLinks).length).toEqual(1);
  });

  it('should render a <BrandText /> component if brandText is passed', () => {
    const brandText = 'test';
    const renderedComponent = shallow(<Header brandText={brandText} />);
    expect(renderedComponent.find(BrandText).length).toEqual(1);
  });

  it('should not render a <BrandText /> component if no brandText is passed', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find(BrandText).length).toEqual(0);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import TextField from 'components/TextField';
import { LoginPage } from '../index';

describe('<LoginPage />', () => {
  it('should render 2 <TextField /> components', () => {
    const location = { state: { from: '/test' } };
    const renderedComponent = shallow(<LoginPage location={location} />);
    expect(renderedComponent.find(TextField).length).toEqual(2);
  });
});

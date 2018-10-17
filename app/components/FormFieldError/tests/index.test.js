import React from 'react';
import { shallow } from 'enzyme';

import FormFieldError from '../index';

describe('<FormFieldError />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<FormFieldError id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'text';
    const renderedComponent = shallow(
      <FormFieldError>{children}</FormFieldError>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

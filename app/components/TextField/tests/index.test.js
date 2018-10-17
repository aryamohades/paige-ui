/**
 * TextField component tests
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import FormFieldError from 'components/FormFieldError';
import { TextField } from '../index';
import Input from '../Input';

describe('<TextField />', () => {
  it('should render an <Input /> component', () => {
    const renderedComponent = shallow(<TextField />);
    expect(renderedComponent.find(Input).length).toEqual(1);
  });

  it('should call the update form field action when input is received', () => {
    const mockOnInput = jest.fn();
    const event = {
      preventDefault() {},
      target: { value: 'test' },
    };
    const renderedComponent = mount(<TextField onInput={mockOnInput} />);
    renderedComponent.find('input').simulate('change', event);
    expect(mockOnInput.mock.calls.length).toBe(1);
  });

  it('should render a label if label is passed', () => {
    const label = 'test';
    const id = 'test';
    const renderedComponent = shallow(<TextField id={id} label={label} />);
    expect(renderedComponent.find('label').length).toBe(1);
  });

  it('should not render a label if no label is passed', () => {
    const renderedComponent = mount(<TextField />);
    expect(renderedComponent.find('label').length).toBe(0);
  });

  it('should render error if error is passed', () => {
    const error = 'test';
    const renderedComponent = mount(<TextField error={error} />);
    expect(renderedComponent.find(FormFieldError).length).toBe(1);
  });

  it('should not render error if no error is passed', () => {
    const renderedComponent = mount(<TextField />);
    expect(renderedComponent.find(FormFieldError).length).toBe(0);
  });

  it('should render the correct value', () => {
    const mockOnInput = jest.fn();
    const value = 'test';
    const renderedComponent = mount(
      <TextField value={value} onInput={mockOnInput} />,
    );
    expect(renderedComponent.find('input').props().value).toEqual(value);
  });

  it('should render the correct placeholder', () => {
    const placeholder = 'test';
    const renderedComponent = mount(<TextField placeholder={placeholder} />);
    expect(renderedComponent.find('input').props().placeholder).toEqual(
      placeholder,
    );
  });
});

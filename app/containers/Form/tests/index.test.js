import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import createForm from '../index';
import { notEmpty } from '../validators';

describe('createForm', () => {
  const WrappedComponent = () => <div>Hello</div>;
  const Form = createForm(WrappedComponent, {
    connected: false,
    endpoint: '/test',
    formKey: 'test',
    fields: {
      test: {
        type: String,
        validate: notEmpty('test'),
      },
    },
  });

  const validValues = fromJS({ test: 'test' });
  const invalidValues = fromJS({ test: '' });

  it('should render a form', () => {
    const mockInit = jest.fn();
    const renderedComponent = shallow(<Form init={mockInit} />);
    expect(renderedComponent.find('form').length).toEqual(1);
  });

  it('should render its children', () => {
    const mockInit = jest.fn();
    const renderedComponent = shallow(<Form init={mockInit} />);
    expect(renderedComponent.find(WrappedComponent).length).toEqual(1);
  });

  it('should call the init function', () => {
    const mockInit = jest.fn();
    shallow(<Form init={mockInit} />);
    expect(mockInit.mock.calls.length).toEqual(1);
  });

  it('should call the submit and clearErrors functions when valid form is submitted', () => {
    const mockInit = jest.fn();
    const mockSubmit = jest.fn();
    const mockClearErrors = jest.fn();
    const renderedComponent = shallow(
      <Form
        init={mockInit}
        submit={mockSubmit}
        clearErrors={mockClearErrors}
        values={validValues}
      />,
    );
    renderedComponent.find('form').simulate('submit');
    expect(mockClearErrors.mock.calls.length).toEqual(1);
    expect(mockSubmit.mock.calls.length).toEqual(1);
  });

  it('should call the error function when invalid form is submitted', () => {
    const mockInit = jest.fn();
    const mockError = jest.fn();
    const renderedComponent = shallow(
      <Form init={mockInit} error={mockError} values={invalidValues} />,
    );
    renderedComponent.find('form').simulate('submit');
    expect(mockError.mock.calls.length).toEqual(1);
  });
});

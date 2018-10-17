/**
 * Tests for SubmitButton component
 */

import React from 'react';
import { mount } from 'enzyme';

import SubmitButton from '../index';

const children = <h1>Test</h1>;
const renderComponent = () => mount(<SubmitButton>{children}</SubmitButton>);

describe('<Button />', () => {
  it('should have children', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have a className attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('button').prop('className')).toBeDefined();
  });

  it('should have a submit type attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('button').prop('type')).toEqual('submit');
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';

import { ProtectedRoute } from '../index';

const redirect = '/login';

describe('<ProtectedRoute />', () => {
  it('should render a <Route /> component', () => {
    const renderedComponent = shallow(<ProtectedRoute redirect={redirect} />);
    expect(renderedComponent.find(Route).length).toEqual(1);
  });

  it('should render passed component if allow is true', () => {
    const component = () => <div>test</div>;
    const renderedComponent = mount(
      <Router>
        <ProtectedRoute redirect={redirect} component={component} allow />
      </Router>,
    );
    expect(renderedComponent.find(component).length).toEqual(1);
  });

  it('should handle allow prop passed as a function', () => {
    const component = () => <div>test</div>;
    const allow = () => true;
    const renderedComponent = mount(
      <Router>
        <ProtectedRoute
          redirect={redirect}
          allow={allow}
          component={component}
        />
      </Router>,
    );
    expect(renderedComponent.find(Route).length).toEqual(1);
  });

  it('should redirect if allow is false', () => {
    const component = () => <div>test</div>;
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['/private']}>
        <ProtectedRoute
          exact
          path="/private"
          redirect={redirect}
          component={component}
          allow={false}
        />
      </MemoryRouter>,
    );

    expect(renderedComponent.find(component).length).toEqual(0);
    expect(
      renderedComponent.find('Router').prop('history').location.pathname,
    ).toEqual('/login');
  });
});

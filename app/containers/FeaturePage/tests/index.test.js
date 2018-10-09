import React from 'react';
import { shallow } from 'enzyme';

import H1 from 'components/H1';
import messages from '../messages';
import FeaturePage from '../index';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(<FeaturePage />);
    expect(
      renderedComponent.contains(
        <H1>
          <span>{messages.header}</span>
        </H1>,
      ),
    ).toBe(true);
  });

  it('should never re-render the component', () => {
    const renderedComponent = shallow(<FeaturePage />);
    const inst = renderedComponent.instance();
    expect(inst.shouldComponentUpdate()).toBe(false);
  });
});

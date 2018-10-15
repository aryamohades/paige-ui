import React from 'react';
import { shallow } from 'enzyme';

import A from 'components/A';
import Footer from '../index';
import messages from '../messages';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(<Footer />);
    expect(
      renderedComponent.contains(
        <section>
          <span>{messages.license}</span>
        </section>,
      ),
    ).toBe(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(
      renderedComponent.contains(
        <section>
          <A href="https://twitter.com/mxstbr">Max Stoiber</A>
        </section>,
      ),
    ).toBe(true);
  });
});

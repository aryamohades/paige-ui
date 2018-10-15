import React from 'react';

import A from 'components/A';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <span>{messages.license}</span>
      </section>
      <section>
        <A href="https://twitter.com/mxstbr">Max Stoiber</A>
      </section>
    </Wrapper>
  );
}

export default Footer;

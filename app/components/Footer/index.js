import React from 'react';

import A from 'components/A';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        <div>{ 'License information' }</div>
      </section>
      <section>
        <A href="https://twitter.com/mxstbr">Max Stoiber</A>
      </section>
    </Wrapper>
  );
}

export default Footer;

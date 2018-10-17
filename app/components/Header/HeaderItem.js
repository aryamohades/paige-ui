import React from 'react';
import PropTypes from 'prop-types';

import { StyledLink, ButtonLink, ButtonLinkPrimary } from './itemStyles';

const HeaderItem = ({ primary, text, to, type }) => {
  let Wrapper = primary ? ButtonLinkPrimary : ButtonLink;

  if (type === 'link') {
    Wrapper = StyledLink;
  }

  return (
    <Wrapper to={to}>
      <span>{text}</span>
    </Wrapper>
  );
};

HeaderItem.propTypes = {
  primary: PropTypes.bool,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['link', 'button']),
};

HeaderItem.defaultProps = {
  type: 'link',
};

export default HeaderItem;

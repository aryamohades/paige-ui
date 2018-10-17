/**
 *
 * SubmitButton.js
 *
 * A common form submit button
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';

import StyledButton from './StyledButton';
import Wrapper from './Wrapper';

const SubmitButton = props => (
  <Wrapper>
    <StyledButton type="submit">
      {Children.toArray(props.children)}
    </StyledButton>
  </Wrapper>
);

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubmitButton;

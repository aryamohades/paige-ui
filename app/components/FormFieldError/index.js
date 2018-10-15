import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledError = styled.div`
  color: red;
  font-size: 13px;
`;

const FormFieldError = ({ error }) => <StyledError>{error}</StyledError>;

FormFieldError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default FormFieldError;

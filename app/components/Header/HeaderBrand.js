import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #222;
  font-size: 21px;
  font-weight: bold;
  padding: 1em;
  margin-right: 0.5em;
`;

const HeaderBrand = ({ text }) => <StyledLink to="/">{text}</StyledLink>;

HeaderBrand.propTypes = {
  text: PropTypes.string.isRequired,
};

export default HeaderBrand;

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { linkStyle, buttonStyle } from '../../global-styles';

export const StyledLink = styled(Link)`
  ${linkStyle};
`;

export const StyledButton = styled(Link)`
  ${buttonStyle};
`;

export const StyledButtonPrimary = styled(Link)`
  ${buttonStyle};
`;

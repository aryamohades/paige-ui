import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { linkStyle, buttonStyle } from '../../global-styles';

export const StyledLink = styled(Link)`
  ${linkStyle};
`;

export const ButtonLink = styled(Link)`
  ${buttonStyle};
`;

export const ButtonLinkPrimary = styled(Link)`
  ${buttonStyle};
`;

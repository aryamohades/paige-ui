import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import HeaderBrand from './HeaderBrand';
import HeaderItems from './HeaderItems';

const Header = ({ brandText, left, right }) => (
  <div>
    <NavBar>
      <div>
        {brandText && <HeaderBrand text={brandText} />}
        {left && <HeaderItems items={left} />}
      </div>
      {right && (
        <div>
          <HeaderItems items={right} />
        </div>
      )}
    </NavBar>
  </div>
);

Header.propTypes = {
  brandText: PropTypes.string,
  left: PropTypes.array,
  right: PropTypes.array,
};

export default Header;

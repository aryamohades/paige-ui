import React from 'react';
import PropTypes from 'prop-types';

import HeaderItem from './HeaderItem';

const HeaderItems = ({ items }) =>
  items.map(item => <HeaderItem key={item.id} {...item} />);

HeaderItems.propTypes = {
  items: PropTypes.array,
};

HeaderItems.defaultProps = {
  items: [],
};

export default HeaderItems;

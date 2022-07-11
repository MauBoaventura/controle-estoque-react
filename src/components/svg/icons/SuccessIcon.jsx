import React from 'react';
import PropTypes from 'prop-types';

import * as Theme from '../../../constants/Theme';

const SuccessIcon = (props) => {
  const { color } = props;

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <circle
        cx='12'
        cy='12'
        r='10'
        fill={color}
        stroke={color}
        strokeWidth='2'
      />
      <path
        d='M7 11.5L10.75 15.25L17 9'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

SuccessIcon.propTypes = {
  color: PropTypes.string,
};

SuccessIcon.defaultProps = {
  color: Theme.success,
};

export default SuccessIcon;

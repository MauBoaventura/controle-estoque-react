import React from 'react';
import PropTypes from 'prop-types';

import { WarningIcon, ErrorIcon, SuccessIcon, InfoIcon } from '../svg';

import './styles.scss';

const Toast = (props) => {
  const { type, title, text } = props;

  const icon = () => {
    switch (type) {
      case 'warning': {
        return <WarningIcon />;
      }

      case 'error': {
        return <ErrorIcon />;
      }

      case 'success': {
        return <SuccessIcon />;
      }

      default: {
        return <InfoIcon />;
      }
    }
  };

  return (
    <div className={`toast ${type}`}>
      <div className='toast__icon'>{icon()}</div>

      <div className='toast__content'>
        <div className='toast__title'>{title}</div>
        <div className='toast__text'>{text}</div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(['warning', 'error', 'success', 'info']),
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Toast.defaultProps = {
  type: 'info',
};

export default Toast;

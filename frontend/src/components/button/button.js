import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.module.scss';

const Button = ({onClick, children}) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func
};

export default Button;

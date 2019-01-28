import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.module.scss';

class Input extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleInput = (e) => {
    const value = e.target.value;
    this.setState({value});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <input className={styles.input} {...this.props} type="text" value={this.state.value} onChange={this.handleInput}></input>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Input;

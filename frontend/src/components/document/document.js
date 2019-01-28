import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';

import {byteToKb} from '../../helpers/utils';

import styles from './document.module.scss';

const Document = ({_id, name, size, onDocumentDelete}) => (
  <div className={styles.document}>
    <h3>{name}</h3>
    <div className={styles.footer}>
      <span>{byteToKb(size)}</span>
      <Button onClick={() => onDocumentDelete(_id)}>Delete</Button>
    </div>
  </div>
);

Document.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onDocumentDelete: PropTypes.func.isRequired
};

export default Document;

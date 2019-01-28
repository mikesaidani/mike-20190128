import React from 'react';
import PropTypes from 'prop-types';
import Document from '../document/document';

import {byteToKb, getTotalSize} from '../../helpers/utils';

import styles from './documents.module.scss';

const Documents = ({documents, onDocumentDelete}) => (
  <div className={styles.documents}>
    <div className={styles.header}>
      <span className="total-docs">{documents.length} Documents</span>
      <span className="total-size">Total size: {byteToKb(getTotalSize(documents))}</span>
    </div>

    <div className={styles.list}>
      {documents.map(document => {
        return <Document key={document._id} {...document} onDocumentDelete={onDocumentDelete} />;
      })}
    </div>
  </div>
);

Documents.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  })),
  onDocumentDelete: PropTypes.func.isRequired
};

export default Documents;

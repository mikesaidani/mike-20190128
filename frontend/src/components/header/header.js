import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input';

import styles from './header.module.scss';

const Header = ({onDocumentAdd, onSearchBoxChange}) => (
  <header className={styles.header}>
    <label htmlFor="file-upload" className={styles.file}>
      <input id="file-upload" type="file" accept=".png,.jpg,.jpeg" className={styles.fileinput} onChange={onDocumentAdd} />
      <span>Upload</span>
    </label>

    <Input className={styles.search} onChange={onSearchBoxChange} placeholder="Search documents..." />
  </header>
);

Header.propTypes = {
  onDocumentAdd: PropTypes.func.isRequired,
  onSearchBoxChange: PropTypes.func.isRequired
};

export default Header;

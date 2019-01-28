import React from 'react';
import Header from '../header/header';
import Documents from '../documents/documents';

import Notifications from 'react-notify-toast';
import notify from '../../helpers/notify';

import getDocuments from '../../helpers/api/getDocuments';
import addDocument from '../../helpers/api/addDocument';
import deleteDocument from '../../helpers/api/deleteDocument';

import styles from './main.module.scss';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],
      filtered: null
    };

    this.timer = null;
  }

  async componentDidMount() {
    const [res, err] = await getDocuments();

    if (err) {
      notify.error('An error occured while fetching documents');
      return;
    }

    this.setState({
      documents: res
    });
  }

  fetchDocuments = async (name) => {
    const [res, err] = await getDocuments(name);

    if (err) {
      notify.error('An error occured while fetching documents');
      return;
    }

    this.setState({
      documents: res,
      filtered: name
    });
  }

  handleSearchInput = (value) => {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(async () => {
      this.fetchDocuments(value);
    }, 200);
  }

  handleDocumentAdd = async (event) => {
    // This should ideally go to the env file
    const MAX_UPLOAD_SIZE = 10*1000*1000;
    const files = event.target.files;

    if (!files) {
      notify.error('No files to upload.');
      return;
    }

    if (files.length < 0) {
      notify.error('No files to upload.');
      return;
    }

    if (files.length > 1) {
      notify.error('Please select only one file.');
      return;
    }

    const file = files[0];

    if (file.size >= MAX_UPLOAD_SIZE) {
      notify.error('File is too big.');
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('name', file.name);

    let [, err] = await addDocument(data);

    if (err) {
      notify.error(err);
      return;
    }

    // This is a lazy way of handling the search input when a document gets added.
    // We ideally want to clear the search input and fetch all documents.
    this.fetchDocuments(this.state.filtered);
  }

  handleDocumentDelete = async (id) => {
    let [, err] = await deleteDocument(id);

    if (err) {
      notify.error('An error occured while deleting a document');
      return;
    }

    this.fetchDocuments();
  }

  componentWillUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }

  render() {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.container}>
            <Header onSearchBoxChange={this.handleSearchInput} onDocumentAdd={this.handleDocumentAdd} />
            <Documents documents={this.state.documents} onDocumentDelete={this.handleDocumentDelete} />
          </div>
        </div>
        <Notifications />
      </>
    );
  }
}

export default Main;

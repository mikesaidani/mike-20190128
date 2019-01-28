import axios from 'axios';
import config from '../config';

async function addDocument(data) {
  try {
    const response = await axios.post(`${config.apiUrl}/v1/documents`, data);

    if (response.status !== 201) {
      throw Error(response.status);
    }

    return [response.data, null];
  } catch (error) {
    return [null, 'Could not process upload.'];
  }
};

export default addDocument;

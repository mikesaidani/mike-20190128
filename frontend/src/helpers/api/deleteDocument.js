import axios from 'axios';
import config from '../config';

async function deleteDocument(id) {
  try {
    const response = await axios.delete(`${config.apiUrl}/v1/documents/${id}`);

    if (response.status !== 200) {
      throw Error(response.status);
    }

    return [response.data, null];
  } catch (error) {
    return [null, 'unspecified'];
  }
};

export default deleteDocument;

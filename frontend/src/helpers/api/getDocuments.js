import axios from 'axios';
import config from '../config';

async function getDocuments(name) {
  try {
    let params = {};

    if (name) {
      params = {
        name
      };
    }

    const response = await axios.get(`${config.apiUrl}/v1/documents`, {params});

    if (response.status !== 200) {
      throw Error(response.status);
    }

    return [response.data, null];
  } catch (error) {
    return [null, 'unspecified'];
  }
};

export default getDocuments;

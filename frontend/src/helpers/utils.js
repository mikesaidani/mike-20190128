const getTotalSize = (documents) => {
  return documents.reduce((total, cur, i, doc) => total + doc[i].size, 0);
};

const byteToKb = (size) => {
  return `${Math.floor(size / 1000)}kB`;
};

export {
  getTotalSize,
  byteToKb
};

export default {
  getTotalSize,
  byteToKb
};

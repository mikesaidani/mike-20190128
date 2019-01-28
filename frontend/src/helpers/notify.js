import {notify as toast} from 'react-notify-toast';

const error = (text) => {
  toast.show(text, "custom", 5000, { background: '#0E1717', text: "#FFFFFF" })
};

export default {
  error
};

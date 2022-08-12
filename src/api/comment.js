import axios from './custom-axios';

const COMMENT_API = {
  create: (data) => {
    return axios.post('/Comments', data);
  },
};

export default COMMENT_API;

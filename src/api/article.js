import axios from './custom-axios';

const ARTICLE_API = {
  create: (data) => {
    return axios.post('/Articles', data);
  },
  list: (params) => {
    return axios.get('/Articles', { params });
  },
  getById: (id) => {
    return axios.get(`/Articles/${id}`);
  },
  getComment: (id) => {
    return axios.get(`/Articles/${id}/comment`);
  },
};

export default ARTICLE_API;

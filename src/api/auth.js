import axios from './custom-axios';

const AUTH_API = {
  register: (data) => {
    return axios.post('/Auth', data);
  },
  login: (data) => {
    return axios.post('/Auth/login', data);
  },
  getUser: () => {
    return axios.get('/Auth/me');
  },
  logout: () => {
    return axios.get('/Auth/logout');
  },
  getUserById: (id) => {
    return axios.get(`/Auth/user/${id}`);
  },
};

export default AUTH_API;

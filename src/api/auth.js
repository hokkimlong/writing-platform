import axios from './custom-axios';

const AUTH_API = {
  login: (data) => {
    return axios.post('auth', data);
  },
  logout: () => {
    return axios.get('auth/logout');
  },
  getUser: () => {
    return axios.get('auth/users/me');
  },
};

export default AUTH_API;

import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API}/api/v1`;

axios.defaults.withCredentials = true;

// check if forbidden will log user out
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response?.status === 403) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axios;

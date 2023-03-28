import axios from "axios";

const baseURL = `${process.env.REACT_APP_API}/api`;

axios.defaults.baseURL = baseURL;

// axios.defaults.withCredentials = true;

export const getToken = () => {
  const token = window.localStorage.getItem("token");
  return token || null;
};

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const setToken = (token) => {
  let accessToken = null;
  if (token) {
    window.localStorage.setItem("token", token);
    accessToken = token;
  } else {
    accessToken = getToken();
  }
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
};

export const clearToken = () => {
  window.localStorage.removeItem("token");
};

// check if forbidden will log user out
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response?.status === 401) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axios;

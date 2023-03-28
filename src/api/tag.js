import axios from "./custom-axios";

const TAG_API = {
  list: (params) => {
    return axios.get("/Tags", { params });
  },
  getById: (id) => {
    return axios.get(`/Tags/${id}`);
  },
  popular: (params) => {
    return axios.get("/Tags/popular", { params });
  },
};

export default TAG_API;

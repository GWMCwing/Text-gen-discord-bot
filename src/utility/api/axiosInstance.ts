import axios from 'axios';

function getAxiosInstance() {
  return axios.create({ baseURL: 'http://localhost:5000/api', timeout: 0 });
}

export default getAxiosInstance;

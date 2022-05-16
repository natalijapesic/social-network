import axios, { AxiosError, AxiosRequestConfig } from "axios";
import storeService from "../storeService";
import config from './app.config.json'

axios.defaults.baseURL = `${config.server}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let token = storeService.getAccessToken();
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// axios.interceptors.response.use(
//   (response: AxiosRequestConfig) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         error.config.headers!['Authorization'] = `Bearer ${storeService.getAccessToken()}`;
//         return error.config
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;

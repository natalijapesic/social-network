import axios, { AxiosError, AxiosRequestConfig } from "axios";
import config from './app.config.json'

axios.defaults.baseURL = `${config.server}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        config.headers!['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response: AxiosRequestConfig) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 401) {
            error.config.headers!['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
            return error.config
        }
      }
      return Promise.reject(error);
    }
  );

export default axios;

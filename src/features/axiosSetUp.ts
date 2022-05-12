import axios, { AxiosError, AxiosRequestConfig } from "axios";
import config from './app.config.json'
import storeService from '../storeService';

axios.defaults.baseURL = `${config.server}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';



axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => {

      const accessToken = storeService.getAccessToken();
      if(accessToken)
      {
        config.headers!['Authorization'] = `Bearer ${accessToken}`;
        return config;
      }
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

          const accessToken = storeService.getAccessToken();
          if(accessToken)
          {
            error.config.headers!['Authorization'] = `Bearer ${accessToken}`;
            return error.config
          }
        }
      }
      return Promise.reject(error);
    }
  );

export default axios;

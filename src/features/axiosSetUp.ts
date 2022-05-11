import axios from "axios";
import config from './app.config.json'

axios.defaults.baseURL = `${config.server}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export default axios;
// kako da proverim da li je 401 ove i kako da export-ujem
// axios.interceptors.request.use(
//     async (config: AxiosRequestConfig) => {
//         config.headers!['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
//         return config;
//     },
//     error =>{
//         return Promise.reject(error);
//     }
// );


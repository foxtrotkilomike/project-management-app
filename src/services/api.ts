import axios from 'axios';
import { getAppData } from '../helpers/handleAppData';
import { AppData } from '../config/data';

const AxiosConfig = {
  baseURL: 'https://pm-app-backend-production.up.railway.app',
  timeout: 60000,
};

export const authInstance = axios.create(AxiosConfig);
export const instance = axios.create(AxiosConfig);

instance.interceptors.request.use((config) => {
  config.headers = { Authorization: `Bearer ${getAppData(AppData.TOKEN)}` };
  return config;
});

export default instance;

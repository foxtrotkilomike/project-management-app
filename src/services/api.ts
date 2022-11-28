import axios from 'axios';
import { getAppData } from './authService';

export const Endpoints = {
  auth: {
    base: '/auth',
    signUp: '/signup',
    signIn: '/signin',
  },
};

const AxiosConfig = {
  baseURL: 'http://localhost:3000',
  timeout: 5000,
};

export const authInstance = axios.create(AxiosConfig);
export const instance = axios.create(AxiosConfig);

instance.interceptors.request.use((config) => {
  config.headers = { Authorization: `Bearer ${getAppData('token')}` };
  return config;
});

export default instance;

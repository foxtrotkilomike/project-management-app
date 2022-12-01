import axios from 'axios';
import { getAppData } from './authService';

export const Endpoints = {
  auth: {
    base: '/auth',
    signUp: '/signup',
    signIn: '/signin',
  },
  users: '/users',
  boards: {
    base: '/boards',
    set: '/boardsSet',
  },
};

const AxiosConfig = {
  baseURL: 'https://pm-app-backend.onrender.com',
  timeout: 5000,
};

export const authInstance = axios.create(AxiosConfig);
export const instance = axios.create(AxiosConfig);

instance.interceptors.request.use((config) => {
  config.headers = { Authorization: `Bearer ${getAppData('token')}` };
  return config;
});

export default instance;

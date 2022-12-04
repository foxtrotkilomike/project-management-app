import axios from 'axios';
import { getAppData } from '../helpers/handleAppData';
import { AppData } from '../config/data';

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
  columns: {
    base: 'columns',
    set: '/columnsSet',
  },
  tasks: {
    base: 'tasks',
    set: '/tasksSet',
  },
};

const AxiosConfig = {
  baseURL: 'https://pm-app-backend.onrender.com',
  timeout: 60000,
};

export const authInstance = axios.create(AxiosConfig);
export const instance = axios.create(AxiosConfig);

instance.interceptors.request.use((config) => {
  config.headers = { Authorization: `Bearer ${getAppData(AppData.TOKEN)}` };
  return config;
});

export default instance;

import axios from 'axios';

export const Endpoints = {
  auth: {
    base: '/auth',
    signUp: '/signup',
    signIn: '/signin',
  },
};

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

export default instance;

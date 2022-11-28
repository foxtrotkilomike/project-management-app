import axios, { Endpoints } from './api';

const usersEndpoint = Endpoints.users;

const getAllUsers = async () => axios.get(usersEndpoint).then(({ data }) => data);
const getUserById = async (id: string) =>
  axios.get(`${usersEndpoint}/${id}`).then(({ data }) => data);

export { getAllUsers, getUserById };

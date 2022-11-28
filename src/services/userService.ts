import axios, { Endpoints } from './api';

const usersEndpoint = Endpoints.users;

const getAllUsers = async () => axios.get(usersEndpoint).then(({ data }) => data);

export { getAllUsers };

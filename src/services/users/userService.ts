import axios, { Endpoints } from '../api';
import { User, UserResponse } from './types';
import { ApiError } from '../../config/types';
import { handleApiErrors } from '../handleApiErrors';

const endpoint = Endpoints.users;

const getAllUsers = async (): Promise<UserResponse[] | ApiError> =>
  axios
    .get(endpoint)
    .then(({ data }) => data as UserResponse[])
    .catch(handleApiErrors);

const getUserById = async (id: string): Promise<UserResponse | ApiError> =>
  axios
    .get(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponse)
    .catch(handleApiErrors);

const deleteUserById = async (id: string): Promise<UserResponse | ApiError> =>
  axios
    .delete(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponse)
    .catch(handleApiErrors);

const updateUserById = async (id: string, userData: User): Promise<UserResponse | ApiError> =>
  axios
    .put(`${endpoint}/${id}`, userData)
    .then(({ data }) => data as UserResponse)
    .catch(handleApiErrors);

export { getAllUsers, getUserById, deleteUserById, updateUserById };

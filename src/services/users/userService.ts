import axios, { Endpoints } from '../api';
import { UserData, UserResponseData } from './types';
import { ApiError } from '../../config/types';
import { handleApiErrors } from '../handleApiErrors';

const endpoint = Endpoints.users;

const getAllUsers = async (): Promise<UserResponseData[] | ApiError> =>
  axios
    .get(endpoint)
    .then(({ data }) => data as UserResponseData[])
    .catch(handleApiErrors);

const getUserById = async (id: string): Promise<UserResponseData | ApiError> =>
  axios
    .get(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponseData)
    .catch(handleApiErrors);

const deleteUserById = async (id: string): Promise<UserResponseData | ApiError> =>
  axios
    .delete(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponseData)
    .catch(handleApiErrors);

const updateUserById = async (
  id: string,
  userData: UserData
): Promise<UserResponseData | ApiError> =>
  axios
    .put(`${endpoint}/${id}`, userData)
    .then(({ data }) => data as UserResponseData)
    .catch(handleApiErrors);

export { getAllUsers, getUserById, deleteUserById, updateUserById };

import { AxiosError } from 'axios';
import axios, { Endpoints } from '../api';
import { UserData, UserResponseData } from './types';
import { ApiError, ServerErrorResponse } from '../../config/types';
import { apiErrors } from '../../config/data';

const endpoint = Endpoints.users;

const getAllUsers = async (): Promise<UserResponseData[] | ApiError> =>
  axios
    .get(endpoint)
    .then(({ data }) => data as UserResponseData[])
    .catch(handleUserServiceErrors);

const getUserById = async (id: string): Promise<UserResponseData | ApiError> =>
  axios
    .get(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponseData)
    .catch(handleUserServiceErrors);

const deleteUserById = async (id: string): Promise<UserResponseData | ApiError> =>
  axios
    .delete(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponseData)
    .catch(handleUserServiceErrors);

const updateUserById = async (
  id: string,
  userData: UserData
): Promise<UserResponseData | ApiError> =>
  axios
    .put(`${endpoint}/${id}`, userData)
    .then(({ data }) => data as UserResponseData)
    .catch(handleUserServiceErrors);

const handleUserServiceErrors = (error: AxiosError): ApiError => {
  const { response, request } = error;

  if (error.isAxiosError) {
    if (response) {
      return {
        code: response.status,
        message: (response.data as ServerErrorResponse).message,
      };
    } else if (request) {
      return apiErrors.serverNotResponding;
    }
  }

  return apiErrors.fallbackError;
};

export { getAllUsers, getUserById, deleteUserById, updateUserById };

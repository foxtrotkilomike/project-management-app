import { AxiosError } from 'axios';
import axios from '../api';
import { UserData, UserResponseData } from './types';
import { ApiServiceError, ServerErrorResponse } from '../../config/types';
import userServiceData from './data';

const { endpoint, errors } = userServiceData;

const getAllUsers = async (): Promise<UserResponseData[] | ApiServiceError> =>
  axios
    .get(endpoint)
    .then(({ data }) => data as UserResponseData[])
    .catch(handleUserServiceErrors);

const getUserById = async (id: string): Promise<UserResponseData | ApiServiceError> =>
  axios
    .get(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponseData)
    .catch(handleUserServiceErrors);

const deleteUserById = async (id: string): Promise<UserResponseData | ApiServiceError> =>
  axios
    .delete(`${endpoint}/${id}`)
    .then(({ data }) => data as UserResponseData)
    .catch(handleUserServiceErrors);

const updateUserById = async (
  id: string,
  userData: UserData
): Promise<UserResponseData | ApiServiceError> =>
  axios
    .put(`${endpoint}/${id}`, userData)
    .then(({ data }) => data as UserResponseData)
    .catch(handleUserServiceErrors);

const handleUserServiceErrors = (error: AxiosError): ApiServiceError => {
  const { response, request } = error;

  if (error.isAxiosError) {
    if (response) {
      return {
        code: response.status,
        message: (response.data as ServerErrorResponse).message,
      };
    } else if (request) {
      return errors.serverNotResponding;
    }
  }

  return errors.fallbackError;
};

export { getAllUsers, getUserById, deleteUserById, updateUserById };

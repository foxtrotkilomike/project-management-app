import axios, { Endpoints } from './api';
import { UserData } from '../config/types';
import { ResponseStatus } from '../config/constants';
import { AxiosError } from 'axios';

const userServiceData = {
  endpoint: Endpoints.users,
  errors: {
    userAlreadyExits: {
      code: ResponseStatus.USER_ALREADY_EXIST,
      message: 'User already exist',
    },
    notAuthorized: {
      code: ResponseStatus.NOT_AUTHORIZED,
      message: 'Not authorized',
    },
    badRequest: {
      code: ResponseStatus.BAD_REQUEST,
      message: 'Bad request',
    },
    serverNotResponding: {
      code: ResponseStatus.UNKNOWN_ERROR,
      message: 'Server not responding',
    },
    fallbackError: {
      code: ResponseStatus.UNKNOWN_ERROR,
      message: 'Unknown error',
    },
  },
};

const { endpoint, errors } = userServiceData;

const getAllUsers = async () =>
  axios
    .get(endpoint)
    .then(({ data }) => data)
    .catch(handleUserServiceErrors);

const getUserById = async (id: string) =>
  axios
    .get(`${endpoint}/${id}`)
    .then(({ data }) => data)
    .catch(handleUserServiceErrors);

const updateUserById = async (id: string, userData: UserData) =>
  axios
    .put(`${endpoint}/${id}`, userData)
    .then(({ data }) => data)
    .catch(handleUserServiceErrors);

const handleUserServiceErrors = (error: AxiosError) => {
  const { response, request } = error;

  if (error.isAxiosError) {
    if (response) {
      switch (response.status) {
        case ResponseStatus.USER_ALREADY_EXIST:
          return errors.userAlreadyExits;

        case ResponseStatus.NOT_AUTHORIZED:
          return errors.notAuthorized;

        case ResponseStatus.BAD_REQUEST:
          return errors.badRequest;

        default:
          return {
            code: response.status,
            message: response.data,
          };
      }
    } else if (request) {
      return errors.serverNotResponding;
    } else {
      return errors.fallbackError;
    }
  }
};

export { getAllUsers, getUserById, updateUserById };

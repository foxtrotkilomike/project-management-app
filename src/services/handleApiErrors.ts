import { AxiosError } from 'axios';
import { ApiError, ServerErrorResponse } from '../config/types';
import { apiErrors } from '../config/data';

export const handleApiErrors = (error: AxiosError): ApiError => {
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

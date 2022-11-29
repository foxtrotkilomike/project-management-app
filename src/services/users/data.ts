import { Endpoints } from '../api';
import { ResponseStatus } from '../../config/constants';
import { ApiServiceError } from '../../config/types';

export default {
  endpoint: Endpoints.users,
  errors: {
    serverNotResponding: {
      code: ResponseStatus.UNKNOWN_ERROR,
      message: 'Server not responding',
    },
    fallbackError: {
      code: ResponseStatus.UNKNOWN_ERROR,
      message: 'Unknown error',
    },
  } as Record<string, ApiServiceError>,
};

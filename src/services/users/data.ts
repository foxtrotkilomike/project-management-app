import { Endpoints } from '../api';
import { ResponseStatus } from '../../config/constants';

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
  },
};

import axios, { Endpoints } from '../api';
import { ApiError } from '../../config/types';
import { BoardsResponseData } from './types';
import { handleApiErrors } from '../handleApiErrors';

const endpoint = Endpoints.boards;

const getAllBoards = async (): Promise<BoardsResponseData[] | ApiError> =>
  axios
    .get(endpoint.base)
    .then(({ data }) => data as BoardsResponseData[])
    .catch(handleApiErrors);

export { getAllBoards };

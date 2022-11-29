import axios, { Endpoints } from '../api';
import { ApiError } from '../../config/types';
import { Board, BoardsResponse } from './types';
import { handleApiErrors } from '../handleApiErrors';

const endpoint = Endpoints.boards;

const getAllBoards = async (): Promise<BoardsResponse[] | ApiError> =>
  axios
    .get(endpoint.base)
    .then(({ data }) => data as BoardsResponse[])
    .catch(handleApiErrors);

const createBoard = async (board: Board): Promise<BoardsResponse | ApiError> =>
  axios
    .post(endpoint.base, board)
    .then(({ data }) => data as BoardsResponse)
    .catch(handleApiErrors);

const getBoardById = (id: string): Promise<BoardsResponse | ApiError> =>
  axios
    .get(`${endpoint.base}/${id}`)
    .then(({ data }) => data as BoardsResponse)
    .catch(handleApiErrors);

const getBoardsByIds = (ids: string[]): Promise<BoardsResponse[] | ApiError> =>
  axios
    .get(endpoint.set, { params: { ids: ids.join(',') } })
    .then(({ data }) => data as BoardsResponse[])
    .catch(handleApiErrors);

const getBoardsByUserId = (id: string): Promise<BoardsResponse[] | ApiError> =>
  axios
    .get(`${endpoint.set}/${id}`)
    .then(({ data }) => data as BoardsResponse[])
    .catch(handleApiErrors);

const deleteBoardById = (id: string): Promise<BoardsResponse | ApiError> =>
  axios
    .delete(`${endpoint.base}/${id}`)
    .then(({ data }) => data as BoardsResponse)
    .catch(handleApiErrors);

const updateBoardById = (id: string, board: Board): Promise<BoardsResponse | ApiError> =>
  axios
    .put(`${endpoint.base}/${id}`, board)
    .then(({ data }) => data as BoardsResponse)
    .catch(handleApiErrors);

export {
  getAllBoards,
  createBoard,
  getBoardById,
  getBoardsByIds,
  getBoardsByUserId,
  deleteBoardById,
  updateBoardById,
};

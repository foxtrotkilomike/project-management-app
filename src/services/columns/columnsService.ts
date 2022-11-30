import axios, { Endpoints } from '../api';
import { ApiError } from '../../config/types';
import { ColumnsResponse, CreatedColumn, UpdatedOrderColumn } from './types';
import { handleApiErrors } from '../handleApiErrors';

const boardsEndpoint = Endpoints.boards.base;
const { base: columnsBaseEndpoint, set: columnsSetEndpoint } = Endpoints.columns;

const createColumnsUrl = (boardId: string, columnId?: string) =>
  columnId
    ? `${boardsEndpoint}/${boardId}/${columnsBaseEndpoint}/${columnId}`
    : `${boardsEndpoint}/${boardId}/${columnsBaseEndpoint}`;

const getColumns = async (boardId: string): Promise<ColumnsResponse[] | ApiError> => {
  const url = createColumnsUrl(boardId);

  return axios
    .get(url)
    .then(({ data }) => data as ColumnsResponse[])
    .catch(handleApiErrors);
};

const createColumn = async (
  boardId: string,
  columnData: CreatedColumn
): Promise<ColumnsResponse | ApiError> => {
  const url = createColumnsUrl(boardId);

  return axios
    .post(url, columnData)
    .then(({ data }) => data as ColumnsResponse)
    .catch(handleApiErrors);
};

const getColumnById = async (
  boardId: string,
  columnId: string
): Promise<ColumnsResponse | ApiError> => {
  const url = createColumnsUrl(boardId, columnId);

  return axios
    .get(url)
    .then(({ data }) => data as ColumnsResponse)
    .catch(handleApiErrors);
};

const updateColumnById = async (
  boardId: string,
  columnId: string,
  columnData: CreatedColumn
): Promise<ColumnsResponse | ApiError> => {
  const url = createColumnsUrl(boardId, columnId);

  return axios
    .put(url, columnData)
    .then(({ data }) => data as ColumnsResponse)
    .catch(handleApiErrors);
};

const deleteColumnById = async (
  boardId: string,
  columnId: string
): Promise<ColumnsResponse | ApiError> => {
  const url = createColumnsUrl(boardId, columnId);

  return axios
    .delete(url)
    .then(({ data }) => data as ColumnsResponse)
    .catch(handleApiErrors);
};

const getColumnsByIds = async (columnIds: string[]): Promise<ColumnsResponse[] | ApiError> =>
  axios
    .get(columnsSetEndpoint, { params: { ids: columnIds.join(',') } })
    .then(({ data }) => data as ColumnsResponse[])
    .catch(handleApiErrors);

const getColumnsByUserId = async (userId: string): Promise<ColumnsResponse[] | ApiError> =>
  axios
    .get(columnsSetEndpoint, { params: { userId } })
    .then(({ data }) => data as ColumnsResponse[])
    .catch(handleApiErrors);

const changeColumnsOrder = async (
  columns: UpdatedOrderColumn[]
): Promise<ColumnsResponse[] | ApiError> =>
  axios
    .patch(columnsSetEndpoint, columns)
    .then(({ data }) => data as ColumnsResponse[])
    .catch(handleApiErrors);

export {
  getColumns,
  createColumn,
  getColumnById,
  updateColumnById,
  deleteColumnById,
  getColumnsByIds,
  getColumnsByUserId,
  changeColumnsOrder,
};

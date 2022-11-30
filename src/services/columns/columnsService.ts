import axios, { Endpoints } from '../api';
import { ApiError } from '../../config/types';
import { ColumnsResponse } from './types';
import { handleApiErrors } from '../handleApiErrors';

const boardsEndpoint = Endpoints.boards.base;
const { base: columnsBaseEndpoint } = Endpoints.columns;

const getColumns = async (boardId: string): Promise<ColumnsResponse[] | ApiError> =>
  axios
    .get(`${boardsEndpoint}/${boardId}/${columnsBaseEndpoint}`)
    .then(({ data }) => data as ColumnsResponse[])
    .catch(handleApiErrors);

export { getColumns };

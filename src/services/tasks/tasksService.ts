import axios from '../api';
import { ApiError } from '../../config/types';
import { CreatedTask, TasksResponse, UpdatedSetTask, UpdatedTask } from './types';
import { handleApiErrors } from '../handleApiErrors';
import Endpoints from '../endpoints';

const boardsEndpoint = Endpoints.boards.base;
const { base: columnsBaseEndpoint } = Endpoints.columns;
const { base: tasksBaseEndpoint, set: tasksSetEndpoint } = Endpoints.tasks;

const createTasksUrl = (boardId: string, columnId: string, tasksId?: string) => {
  const baseUrl = `${boardsEndpoint}/${boardId}/${columnsBaseEndpoint}/${columnId}/${tasksBaseEndpoint}`;
  return tasksId ? `${baseUrl}/${tasksId}` : baseUrl;
};

const createTask = async (
  boardId: string,
  columnId: string,
  task: CreatedTask
): Promise<TasksResponse | ApiError> => {
  const url = createTasksUrl(boardId, columnId);

  return axios
    .post(url, task)
    .then(({ data }) => data as TasksResponse)
    .catch(handleApiErrors);
};

const getTasks = async (boardId: string, columnId: string): Promise<TasksResponse[] | ApiError> => {
  const url = createTasksUrl(boardId, columnId);

  return axios
    .get(url)
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);
};

const getTaskById = async (
  boardId: string,
  columnId: string,
  taskId: string
): Promise<TasksResponse | ApiError> => {
  const url = createTasksUrl(boardId, columnId, taskId);

  return axios
    .get(url)
    .then(({ data }) => data as TasksResponse)
    .catch(handleApiErrors);
};

const getTasksByIds = async (tasksIds: string[]): Promise<TasksResponse[] | ApiError> =>
  axios
    .get(tasksSetEndpoint, { params: { ids: tasksIds.join(',') } })
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);

const getTasksByUserId = async (userId: string): Promise<TasksResponse[] | ApiError> =>
  axios
    .get(tasksSetEndpoint, { params: { userId } })
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);

const getTasksBySearch = async (search: string): Promise<TasksResponse[] | ApiError> =>
  axios
    .get(tasksSetEndpoint, { params: { search } })
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);

const getTasksByBoardId = async (boardId: string): Promise<TasksResponse[] | ApiError> =>
  axios
    .get(`${tasksSetEndpoint}/${boardId}`)
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);

const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  task: UpdatedTask
): Promise<TasksResponse | ApiError> => {
  const url = createTasksUrl(boardId, columnId, taskId);

  return axios
    .put(url, task)
    .then(({ data }) => data as TasksResponse)
    .catch(handleApiErrors);
};

const updateTasksSet = async (tasksSet: UpdatedSetTask[]): Promise<TasksResponse[] | ApiError> =>
  axios
    .patch(tasksSetEndpoint, tasksSet)
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);

const deleteTask = async (
  boardId: string,
  columnId: string,
  taskId: string
): Promise<TasksResponse | ApiError> => {
  const url = createTasksUrl(boardId, columnId, taskId);

  return axios
    .delete(url)
    .then(({ data }) => data as TasksResponse)
    .catch(handleApiErrors);
};

export {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByIds,
  getTasksByUserId,
  getTasksBySearch,
  updateTasksSet,
  getTasksByBoardId,
};

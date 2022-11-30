import axios, { Endpoints } from '../api';
import { ApiError } from '../../config/types';
import { CreatedTask, TasksResponse, UpdatedTask } from './types';
import { handleApiErrors } from '../handleApiErrors';

const boardsEndpoint = Endpoints.boards.base;
const { base: columnsBaseEndpoint } = Endpoints.columns;
const { base: tasksBaseEndpoint, set: tasksSetEndpoint } = Endpoints.tasks;

const createTasksUrl = (boardId: string, columnId: string, tasksId?: string) => {
  const baseUrl = `${boardsEndpoint}/${boardId}/${columnsBaseEndpoint}/${columnId}/${tasksBaseEndpoint}`;
  return tasksId ? `${baseUrl}/${tasksId}` : baseUrl;
};

const getTasks = async (boardId: string, columnId: string): Promise<TasksResponse[] | ApiError> => {
  const url = createTasksUrl(boardId, columnId);

  return axios
    .get(url)
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);
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

const getTasksByIds = async (tasksIds: string[]): Promise<TasksResponse[] | ApiError> =>
  axios
    .get(tasksSetEndpoint, { params: { ids: tasksIds.join(',') } })
    .then(({ data }) => data as TasksResponse[])
    .catch(handleApiErrors);

export { getTasks, createTask, getTaskById, updateTask, deleteTask, getTasksByIds };

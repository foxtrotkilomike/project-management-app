import { ColumnsResponse } from '../services/columns/types';
import { getTasks } from '../services/tasks/tasksService';
import { TasksResponse } from '../services/tasks/types';

export const fillColumnWithTasks = async (column: ColumnsResponse): Promise<ColumnModel> => {
  const { boardId, _id } = column;
  const res = await getTasks(boardId, _id);
  if ('code' in res) {
    console.log('error occured during fetching tasks');
    return {
      ...column,
      tasks: [],
    };
  } else {
    return {
      ...column,
      tasks: res,
    };
  }
};

export type ColumnModel = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: TasksResponse[];
};

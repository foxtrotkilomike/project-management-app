import { ColumnsResponse } from '../services/columns/types';
import { getTasks } from '../services/tasks/tasksService';
import { TasksResponse } from '../services/tasks/types';

export const fillColumnWithTasks = async (column: ColumnsResponse): Promise<ColumnModel> => {
  const { boardId, _id } = column;
  const res = await getTasks(boardId, _id);
  if ('code' in res) {
    return {
      ...column,
      tasks: [],
    };
  } else {
    const ordered = res.sort((a, b) => a.order - b.order);
    return {
      ...column,
      tasks: ordered,
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

interface Task {
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

interface TasksResponse extends Task {
  _id: string;
}

type CreatedTask = Omit<Task, 'boardId' | 'columnId'>;
type UpdatedTask = Omit<Task, 'boardId'>;
type UpdatedSetTask = {
  _id: string;
  order: number;
  columnId: string;
};

export type { Task, TasksResponse, CreatedTask, UpdatedTask, UpdatedSetTask };

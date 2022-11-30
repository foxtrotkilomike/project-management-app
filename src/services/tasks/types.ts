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

export type { Task, TasksResponse, CreatedTask };

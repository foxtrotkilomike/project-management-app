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

export type { Task, TasksResponse };

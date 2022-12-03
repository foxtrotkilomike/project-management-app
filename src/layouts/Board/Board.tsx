import { useEffect, useState } from 'react';
import Container from '../../commons/Container';
import { usePathnameEnding } from '../../hooks/usePathnameEnding';
import classes from './Board.module.scss';
import BoardColumn from './BoardColumn';
import BoardColumnsWrapper from './BoardColumnsWrapper';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorderList, updateTasksInColumns } from '../../helpers/dragAndDrop';

// TODO: get rid of MOCKED CONSTANTS

const MOCK_BOARD = { title: 'Title', _id: 'board_id', owner: 'owner', users: ['user1', 'user2'] };
const MOCK_COLUMNS: ColumnResponse[] = [
  {
    _id: 'column 1',
    title: 'column 1',
    order: 0,
    boardId: 'board_id',
  },
  {
    _id: 'column 2',
    title: 'column 2',
    order: 1,
    boardId: 'board_id',
  },
  {
    _id: 'column 3',
    title: 'column 3',
    order: 2,
    boardId: 'board_id',
  },
  {
    _id: 'column 4',
    title: 'column 4',
    order: 3,
    boardId: 'board_id',
  },
  {
    _id: 'column 5',
    title: 'column 5',
    order: 4,
    boardId: 'board_id',
  },
  {
    _id: 'column 6',
    title: 'column 6',
    order: 5,
    boardId: 'board_id',
  },
];
const MOCK_TASKS: Record<string, TaskResponse[]> = {
  // Just mocked data for simulating getting tasks by columnId
  'column 1': [
    {
      _id: 'task0 id',
      title: 'Task title',
      order: 0,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task1 id',
      title: 'Task 1 title',
      order: 1,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task2 id',
      title: 'Task 2 title',
      order: 2,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task3 id',
      title: 'Task 3 title',
      order: 3,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task4 id',
      title: 'Task 4 title',
      order: 4,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task5 id',
      title: 'Task 5 title',
      order: 5,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task6 id',
      title: 'Task 6 title',
      order: 6,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task7 id',
      title: 'Task 7 title',
      order: 7,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task8 id',
      title: 'Task 8 title',
      order: 8,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task9 id',
      title: 'Task 9 title',
      order: 9,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task10 id',
      title: 'Task 10 title',
      order: 10,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task11 id',
      title: 'Task 11 title',
      order: 11,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
    {
      _id: 'task12 id',
      title: 'Task 12 title',
      order: 12,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
  ],
  'column 2': [
    {
      _id: 'task1 id col2',
      title: 'Task 1 col 2 title',
      order: 0,
      boardId: 'board_id',
      columnId: 'column 2',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
  ],
  'column 3': [
    {
      _id: 'task1 id col3',
      title: 'Task 1 col 3 title',
      order: 0,
      boardId: 'board_id',
      columnId: 'column 3',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
  ],
};

// TODO: get rid of MOCKED FUNCTIONS
const getBoard = (boardId: string) =>
  Promise.resolve({ json: () => MOCK_BOARD }).then((res) => res.json()); //TODO: implement getting board by id;
const getColumns = (boardId: string) =>
  Promise.resolve({ json: () => MOCK_COLUMNS }).then((res) => res.json()); //TODO: implement getting columns by board id;
const getTasks = (columnId: string) =>
  Promise.resolve({ json: () => MOCK_TASKS[columnId] }).then((res) => res.json()); //TODO: implement getting tasks by board id;

const fillColumnWithTasks = async (column: ColumnResponse): Promise<ColumnModel> => {
  const tasks = (await getTasks(column._id)) || [];
  return {
    ...column,
    tasks,
  };
};

export const Board = (): JSX.Element => {
  const boardId = usePathnameEnding();
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [columns, setColumns] = useState<ColumnModel[]>([]);

  useEffect(() => {
    getBoard(boardId).then((board) => setBoard(board));
    getColumns(boardId).then(async (columns) => {
      const columnModels = await Promise.all(
        columns.map(async (column) => await fillColumnWithTasks(column))
      );
      setColumns(columnModels);
    });
    return () => {
      //TODO: implement setting tasks and columns changes to backend
    };
  }, []);

  const pushColumn = (column: ColumnModel) => {
    const newColumns = [...columns];
    newColumns.push(column);
    setColumns(newColumns);
  };

  const renderColumns = columns.map((column, index) => (
    <BoardColumn key={column._id} {...column} index={index} />
  ));

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'tasks') {
      setColumns(updateTasksInColumns(columns, source, destination));
    }

    if (type === 'column') {
      setColumns(reorderList(columns, source, destination));
    }
  };

  return (
    <Container centered main growing>
      <div className={classes.board}>
        <h1 className={classes.board__title}>{board?.title}</h1>
        <div className={classes.board__content}>
          <DragDropContext onDragEnd={onDragEnd}>
            <BoardColumnsWrapper pushColumn={pushColumn}>
              {renderColumns.length > 0 && renderColumns}
            </BoardColumnsWrapper>
          </DragDropContext>
        </div>
      </div>
    </Container>
  );
};

export type BoardResponse = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type ColumnResponse = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type ColumnModel = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: TaskResponse[];
};

export type TaskResponse = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

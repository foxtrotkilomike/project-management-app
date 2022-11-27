import { useEffect, useState } from 'react';
import Container from '../../commons/Container';
import { usePathnameEnding } from '../../hooks/usePathnameEnding';
import classes from './Board.module.scss';
import BoardColumn from './BoardColumn';
import BoardColumnsWrapper from './BoardColumnsWrapper';

// TODO: get rid of MOCKED CONSTANTS

const MOCK_BOARD = { title: 'Title', _id: 'board_id', owner: 'owner', users: ['user1', 'user2'] };
const MOCK_COLUMNS = [
  {
    _id: 'column 1',
    title: 'column 1',
    order: 1,
    boardId: 'board_id',
  },
  {
    _id: 'column 2',
    title: 'column 2',
    order: 2,
    boardId: 'board_id',
  },
  {
    _id: 'column 3',
    title: 'column 3',
    order: 3,
    boardId: 'board_id',
  },
];
const MOCK_TASKS = {
  'column 1': [
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
      order: 1,
      boardId: 'board_id',
      columnId: 'column 1',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
  ],
  'column 2': [
    {
      _id: 'task1 id',
      title: 'Task 1 col 2 title',
      order: 1,
      boardId: 'board_id',
      columnId: 'column 2',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
  ],
  'column 3': [
    {
      _id: 'task1 id',
      title: 'Task 1 col 3 title',
      order: 1,
      boardId: 'board_id',
      columnId: 'column 3',
      description: 'decription of task',
      userId: 'user id',
      users: ['Alina', 'Phil', 'Stas', 'Nastya'],
    },
  ],
};

// TODO: get rid of MOCKED FUNCTIONS
const getBoard = (id: string) =>
  Promise.resolve({ json: () => MOCK_BOARD }).then((res) => res.json()); //TODO: implement getting board by id;
const getColumns = (id: string) =>
  Promise.resolve({ json: () => MOCK_COLUMNS }).then((res) => res.json()); //TODO: implement getting columns by board id;
const getTasks = (id: string) =>
  Promise.resolve({ json: () => MOCK_TASKS[id] }).then((res) => res.json()); //TODO: implement getting tasks by board id;

const fillColumnWithTasks = async (column: ColumnResponseType): Promise<ColumnModel> => {
  const tasks = await getTasks(column._id);
  return {
    ...column,
    tasks,
  };
};

export const Board = (): JSX.Element => {
  const boardId = usePathnameEnding();
  const [board, setBoard] = useState<BoardType | null>(null);
  const [columns, setColumns] = useState<ColumnModel[]>([]);

  useEffect(() => {
    getBoard(boardId).then((board) => setBoard(board));
    getColumns(boardId).then(async (columns) => {
      const columnModels = await Promise.all(
        columns.map(async (column) => fillColumnWithTasks(column))
      );
      setColumns(columnModels);
    });
  }, []);

  const renderColumns = columns.map((column) => <BoardColumn key={column._id} {...column} />);

  return (
    <Container centered>
      <div className={classes.board}>
        <h1 className={classes.board__title}>{board?.title}</h1>
        <BoardColumnsWrapper>{renderColumns}</BoardColumnsWrapper>
      </div>
    </Container>
  );
};

export type BoardType = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type ColumnResponseType = {
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
  tasks: TaskType[];
};

export type TaskType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

import { useEffect, useState } from 'react';
import Container from '../../commons/Container';
import { usePathnameEnding } from '../../hooks/usePathnameEnding';
import classes from './Board.module.scss';
import BoardColumn from './BoardColumn';
import BoardColumnsWrapper from './BoardColumnsWrapper';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorderList, updateTasksInColumns } from '../../helpers/dragAndDrop';
import Spinner from '../../commons/Spinner';
import { ColumnModel, fillColumnWithTasks } from '../../helpers/fillColumnWithTasks';
import { getBoardById } from '../../services/boards/boardsService';
import {
  changeColumnsOrder,
  createColumn,
  deleteColumnById,
  getColumns,
} from '../../services/columns/columnsService';
import { BoardsResponse } from '../../services/boards/types';
import toast from 'react-hot-toast';
import { toastMessages } from '../../config/data';

export const Board = (): JSX.Element => {
  const boardId = usePathnameEnding();
  const [board, setBoard] = useState<BoardsResponse | null>(null);
  const [columns, setColumns] = useState<ColumnModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const board = await getBoardById(boardId);

      if ('code' in board) {
        toast.error(toastMessages.error.unknown);
        setIsLoading(false);
      } else {
        setBoard(board);
        const columns = await getColumns(boardId);

        if ('code' in columns) {
          toast.error(toastMessages.error.unknown);
          setIsLoading(false);
        } else {
          const columnModels = await Promise.all(
            columns.map(async (column) => await fillColumnWithTasks(column))
          );
          toast.success(toastMessages.success.boardLoaded);
          setColumns(columnModels);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  const addColumn = async (title: string) => {
    setIsLoading(true);
    const order = columns.length;
    const res = await createColumn(boardId, { title, order });

    if ('code' in res) {
      toast.error(toastMessages.error.unknown);
    } else {
      const { _id, boardId, title } = res;
      const column: ColumnModel = {
        _id,
        title,
        order,
        boardId,
        tasks: [],
      };
      const newColumns = [...columns];
      newColumns.push(column);
      setColumns(newColumns);
      toast.success(toastMessages.success.columnCreated);
    }
    setIsLoading(false);
  };
  const removeColumn = async (columnId: string) => {
    setIsLoading(true);
    const res = await deleteColumnById(boardId, columnId);

    if ('code' in res) {
      toast.error(toastMessages.error.unknown);
    } else {
      const initialColumns = [...columns];
      const newColumns = initialColumns.filter((column) => column._id !== res._id);
      const reqData = newColumns.map(({ _id }, index) => ({ _id, order: index }));

      if (reqData.length === 0) {
        setColumns(newColumns);
        setIsLoading(false);
        return;
      }

      const response = await changeColumnsOrder(reqData);

      if ('code' in response) {
        toast.error(toastMessages.error.unknown);
        setColumns(initialColumns);
      } else {
        setColumns(newColumns);
        toast.success(toastMessages.success.columnRemoved);
      }

      setIsLoading(false);
    }
  };

  const renderColumns = columns.map((column, index) => (
    <BoardColumn
      key={column._id}
      {...column}
      setColumns={setColumns}
      index={index}
      onRemove={removeColumn}
    />
  ));

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    setIsLoading(true);

    if (!destination) {
      setIsLoading(false);
      return;
    }

    if (type === 'tasks') {
      setColumns(updateTasksInColumns(columns, source, destination));
      setIsLoading(false);
    }

    if (type === 'column') {
      const initialColumns = [...columns];
      const reorderedColumns = reorderList(columns, source, destination);
      setColumns(reorderedColumns);
      const reqData = reorderedColumns.map(({ _id }, index) => ({ _id, order: index }));
      changeColumnsOrder(reqData).then((res) => {
        if ('code' in res) {
          toast.error(toastMessages.error.unknown);
          setColumns(initialColumns);
        } else {
          setColumns(reorderedColumns);
          toast.success(toastMessages.success.columnReordered);
        }
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Container centered main growing>
        <div className={classes.board}>
          <h1 className={classes.board__title}>{board?.title}</h1>
          <div className={classes.board__content}>
            <DragDropContext onDragEnd={onDragEnd}>
              <BoardColumnsWrapper addColumn={addColumn}>
                {renderColumns.length > 0 && renderColumns}
              </BoardColumnsWrapper>
            </DragDropContext>
          </div>
        </div>
      </Container>
    </>
  );
};

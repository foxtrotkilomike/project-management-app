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
  getColumns,
} from '../../services/columns/columnsService';
import { BoardsResponse } from '../../services/boards/types';
import toast from 'react-hot-toast';
import { toastMessages } from '../../config/data';

export const Board = (): JSX.Element => {
  const boardId = usePathnameEnding();
  const [board] = useState<BoardsResponse | null>(null);
  const [columns, setColumns] = useState<ColumnModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const board = await getBoardById(boardId);
      if ('code' in board) {
        toast.error(toastMessages.error.unknown);
      } else {
        const columns = await getColumns(boardId);
        if ('code' in columns) {
          toast.error(toastMessages.error.unknown);
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

  const renderColumns = columns.map((column, index) => (
    <BoardColumn key={column._id} {...column} index={index} />
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
      {isLoading && <Spinner></Spinner>}
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

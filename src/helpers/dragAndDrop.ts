import { DraggableLocation } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import { toastMessages } from '../config/data';
import { updateTasksSet } from '../services/tasks/tasksService';
import { ColumnModel } from './fillColumnWithTasks';

export function reorderList<T>(
  list: T[],
  source: DraggableLocation,
  destination: DraggableLocation
): T[] {
  const listCopy = [...list];
  const [dragged] = listCopy.splice(source.index, 1);
  listCopy.splice(destination.index, 0, dragged);
  return listCopy;
}

export const updateTasksInColumns = (
  columns: ColumnModel[],
  source: DraggableLocation,
  destination: DraggableLocation
): ColumnModel[] => {
  const columnsList = [...columns];
  const sourceColumn = columnsList.find(
    (column) => column._id === source.droppableId
  ) as ColumnModel;
  const destinationColumn = columnsList.find(
    (column) => column._id === destination.droppableId
  ) as ColumnModel;

  let reqData;
  if (destination.droppableId === source.droppableId) {
    const tasksList = reorderList(sourceColumn.tasks, source, destination);
    sourceColumn.tasks = tasksList;
    reqData = tasksList.map((task, index) => ({
      _id: task._id,
      order: index,
      columnId: source.droppableId,
    }));
  } else {
    const sourceTasksList = [...sourceColumn.tasks];
    const destinationTasksList = [...destinationColumn.tasks];
    const [task] = sourceTasksList.splice(source.index, 1);
    destinationTasksList.splice(destination.index, 0, task);
    sourceColumn.tasks = sourceTasksList;
    destinationColumn.tasks = destinationTasksList;
    const partReqData = [...sourceTasksList].map((task, index) => ({
      _id: task._id,
      order: index,
      columnId: source.droppableId,
    }));
    const partReqData2 = [...destinationTasksList].map((task, index) => ({
      _id: task._id,
      order: index,
      columnId: destination.droppableId,
    }));
    reqData = [...partReqData, ...partReqData2];
  }
  updateTasksSet(reqData).then((result) => {
    if ('code' in result) {
      toast.error(toastMessages.error.unknown);
      return columns;
    } else {
      toast.success(toastMessages.success.tasksReordered);
    }
  });
  return columnsList;
};

import { DraggableLocation } from 'react-beautiful-dnd';
import { ColumnModel } from '../layouts/Board/Board';

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
  if (destination.droppableId === source.droppableId) {
    const tasksList = reorderList(sourceColumn.tasks, source, destination);
    sourceColumn.tasks = tasksList;
  } else {
    const sourceTasksList = [...sourceColumn.tasks];
    const destinationTasksList = [...destinationColumn.tasks];
    const [task] = sourceTasksList.splice(source.index, 1);
    destinationTasksList.splice(destination.index, 0, task);
    sourceColumn.tasks = sourceTasksList;
    destinationColumn.tasks = destinationTasksList;
  }
  return columnsList;
};

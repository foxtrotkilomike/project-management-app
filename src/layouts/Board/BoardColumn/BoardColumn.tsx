import { Button } from 'react-bootstrap';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import Task from '../Task';
import classes from './BoardColumn.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TasksResponse } from '../../../services/tasks/types';
import TrashcanIcon from '../../../assets/svg/trash.svg';
import { useModalState } from '../../../hooks/useModalState';
import { useEffect, useState } from 'react';
import { EditInPlace } from './EditInPlace';
import { updateColumnById } from '../../../services/columns/columnsService';
import ConfirmationModal from '../../../commons/ConfirmationModal';
import { confirmationModalText } from '../../../config/data';

export const BoardColumn = (props: IColumnProps): JSX.Element => {
  const { _id: id, index, boardId, title, order, tasks, onRemove: onColumnRemove } = props;
  const [isModalActive, closeModal, openModal] = useModalState(false);
  const [isConfirmModalActive, closeConfirmModal, openConfirmModal] = useModalState(false);
  const [titleValue, setTitleValue] = useState(title);
  const renderTasks = tasks.map((task) => <Task key={task._id} {...task} index={task.order} />);

  const onRemove = (id: string) => {
    onColumnRemove(id);
  };

  const updateColumn = (title: string) => {
    const newColumn = {
      title,
      order,
    };
    updateColumnById(boardId, id, newColumn);
  };

  useEffect(() => {
    updateColumn(titleValue);
  }, [titleValue]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={classes.column}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={classes.column__header}>
            <div className={classes.header__wrapper}>
              <EditInPlace
                inputClassNames={[classes.column__title]}
                titleClassNames={[classes.column__title]}
                value={titleValue}
                setValue={setTitleValue}
              ></EditInPlace>
            </div>
            <div className={classes.column__controls}>
              <div className={classes.column__badge}>{tasks.length}</div>
              <Button className={classes.column__delete} onClick={openConfirmModal}>
                <img src={TrashcanIcon} alt="trashcan" />
              </Button>
            </div>
          </div>
          <Droppable droppableId={id} type="tasks">
            {(provided) => (
              <ul
                className={classes.column__tasksWrapper}
                {...provided.droppableProps}
                ref={provided.innerRef}
              ></ul>
            )}
          </Droppable>
          <div className={classes.column__footer}>
            <Button className={classes.column__add} variant="primary" onClick={openModal}>
              + Add Task
            </Button>
          </div>
          <Modal
            title="Add new task"
            icon={<TaskIcon />}
            onHide={closeModal}
            isActive={isModalActive}
          >
            {/* TODO ADD FORM FOR ADDING A NEW TASK */}
          </Modal>
          <ConfirmationModal
            title={confirmationModalText.deleteColumn}
            onHide={closeConfirmModal}
            isActive={isConfirmModalActive}
            handleCancelClick={closeConfirmModal}
            handleConfirmationClick={() => onRemove(id)}
          />
        </li>
      )}
    </Draggable>
  );
};

export interface IColumnProps {
  tasks: TasksResponse[];
  title: string;
  _id: string;
  index: number;
  order: number;
  onRemove: (id: string) => void;
  boardId: string;
}

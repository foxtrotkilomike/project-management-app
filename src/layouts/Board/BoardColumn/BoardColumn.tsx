import { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import Task from '../Task';
import classes from './BoardColumn.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TasksResponse } from '../../../services/tasks/types';
import TrashcanIcon from '../../../assets/svg/trash.svg';

export const BoardColumn = (props: IColumnProps): JSX.Element => {
  const { _id: id, index, title, tasks, onRemove: onColumnRemove } = props;
  const [isModalActive, setIsModalActive] = useState(false);
  const renderTasks = tasks.map((task) => <Task key={task._id} {...task} index={task.order} />);
  const openModal = () => {
    setIsModalActive(true);
  };
  const closeModal = () => {
    setIsModalActive(false);
  };

  const onRemove = (id: string) => {
    onColumnRemove(id);
  };

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
            <h4 className={classes.column__title}>{title}</h4>
            <div className={classes.column__badge}>{tasks.length}</div>
            <Button className={classes.column__delete} onClick={() => onRemove(id)}>
              <img src={TrashcanIcon} alt="trashcan" />
            </Button>
          </div>
          <Droppable droppableId={id} type="tasks">
            {(provided) => (
              <ul
                className={classes.column__tasksWrapper}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderTasks}
                {provided.placeholder}
              </ul>
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
  onRemove: (id: string) => void;
}

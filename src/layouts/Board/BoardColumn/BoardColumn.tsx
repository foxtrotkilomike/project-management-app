import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import Task from '../Task';
import classes from './BoardColumn.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import { TaskResponse } from '../Board';

export const BoardColumn = (props: IColumnProps): JSX.Element => {
  const { _id: id, index, title, tasks } = props;
  const [isModalActive, setIsModalActive] = useState(false);
  const renderTasks = tasks.map((item, index) => <Task key={item._id} {...item} index={index} />);
  const openModal = () => {
    setIsModalActive(true);
  };
  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <li className={classes.column} {...provided.droppableProps} ref={provided.innerRef}>
          <div className={classes.column__header}>
            <h4 className={classes.column__title}>{title}</h4>
            <div className={classes.column__badge}>{tasks.length}</div>
          </div>
          <ul className={classes.column__tasksWrapper}>{renderTasks}</ul>
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
    </Droppable>
  );
};

export interface IColumnProps {
  tasks: TaskResponse[];
  title: string;
  _id: string;
  index?: number;
}

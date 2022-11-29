import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import Task from '../Task';
import { ITask } from '../Task/Task';
import classes from './BoardColumn.module.scss';

export const BoardColumn = (props: IColumnProps): JSX.Element => {
  const { title, tasks } = props;
  const [isModalActive, setIsModalActive] = useState(false);
  const renderTasks = tasks.map((item) => <Task key={item._id} {...item} />);
  const openModal = () => {
    setIsModalActive(true);
  };
  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <li className={classes.column}>
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
      <Modal title="Add new task" icon={<TaskIcon />} onHide={closeModal} isActive={isModalActive}>
        {/* TODO ADD FORM FOR ADDING A NEW TASK */}
      </Modal>
    </li>
  );
};

export interface IColumnProps {
  tasks: ITask[];
  title: string;
}

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import { ITask, Task } from '../Task/Task';
import classes from './BoardColumn.module.scss';

export const BoardColumn = (props: BoardColumnProps): JSX.Element => {
  const [isModalActive, setIsModalActive] = useState(false);
  const { title, tasks } = props;

  const renderTasks = tasks.map((item) => <Task key={item.id} {...item} />);

  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <li className={classes.column}>
      <div className={classes.header}>
        <h4>{title}</h4>
        <div className={classes.badge}>{tasks.length}</div>
      </div>
      <ul className={classes.tasksWrapper}>{renderTasks}</ul>
      <div className={classes.footer}>
        <Button className={classes.add} variant="primary" onClick={openModal}>
          + Add task
        </Button>
      </div>
      <Modal title="Add new task" icon={<TaskIcon />} onHide={closeModal} isActive={isModalActive}>
        {/* TODO ADD FORM FOR ADDING A NEW TASK */}
      </Modal>
    </li>
  );
};

export type BoardColumnProps = {
  title: string;
  tasks: ITask[];
};

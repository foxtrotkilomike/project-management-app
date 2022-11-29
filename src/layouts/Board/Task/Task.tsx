import { useState } from 'react';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import classes from './Task.module.scss';

export const Task = (props: ITask): JSX.Element => {
  const { title, description } = props;
  const [isModalActive, setIsModalActive] = useState(false);
  const openModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if ('key' in e) {
      if (e.key === 'Enter') {
        setIsModalActive(true);
      }
    } else {
      setIsModalActive(true);
    }
  };

  const hideModal = () => {
    setIsModalActive(false);
  };

  return (
    <li className={classes.task}>
      <div onClick={openModal} onKeyPress={openModal} role="button" tabIndex={0}>
        <h4 className={classes.task__title}>{title}</h4>
      </div>
      {isModalActive && (
        <Modal isActive={isModalActive} onHide={hideModal} title={title} icon={<TaskIcon />}>
          <p> {description}</p>
        </Modal>
      )}
    </li>
  );
};

export interface ITask {
  _id: string;
  title: string;
  description: string;
}

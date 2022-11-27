import { useState } from 'react';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import classes from './Task.module.scss';

export const Task = (props: ITask): JSX.Element => {
  const [isModalActive, setIsModalActive] = useState(false);

  const { title, description } = props;

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
    <li>
      <div
        className={classes.task}
        onClick={(e) => openModal(e)}
        onKeyPress={(e) => openModal(e)}
        role="button"
        tabIndex={0}
      >
        <h4 className={classes.title}>{title}</h4>
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

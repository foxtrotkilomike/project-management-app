import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import classes from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useModalState } from '../../../hooks/useModalState';

export const Task = (props: ITask): JSX.Element => {
  const { title, description, _id: id, index } = props;
  const [isModalActive, hideModal, showModal] = useModalState(false);
  const openModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if ('key' in e) {
      if (e.key === 'Enter') {
        showModal();
      }
    } else {
      showModal();
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={classes.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={classes.task__content}
            onClick={openModal}
            onKeyPress={openModal}
            role="button"
            tabIndex={0}
          >
            <h4 className={classes.task__title}>{title}</h4>
          </div>
          {isModalActive && (
            <Modal isActive={isModalActive} onHide={hideModal} title={title} icon={<TaskIcon />}>
              <p> {description}</p>
            </Modal>
          )}
        </li>
      )}
    </Draggable>
  );
};

export interface ITask {
  _id: string;
  title: string;
  description: string;
  index: number;
}

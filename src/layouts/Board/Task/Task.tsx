import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import classes from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useModalState } from '../../../hooks/useModalState';
import ConfirmationModal from '../../../commons/ConfirmationModal';
import { confirmationModalText } from '../../../config/data';
import DeleteButton from '../../../assets/svg/close.svg';
import { deleteTask } from '../../../services/tasks/tasksService';

export const Task = (props: ITask): JSX.Element => {
  const { title, description, _id: id, index } = props;
  const [isModalActive, hideModal, showModal] = useModalState(false);

  const [isConfirmModalActive, closeConfirmModal, showConfirmModal] = useModalState(false);

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

  const removeTask = () => {
    deleteTask();
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
          <button className={classes.task__delete} onClick={showConfirmModal}>
            <img src={DeleteButton} alt="Delete" />
          </button>
          {isModalActive && (
            <Modal isActive={isModalActive} onHide={hideModal} title={title} icon={<TaskIcon />}>
              <p> {description}</p>
            </Modal>
          )}
          {isModalActive && (
            <Modal isActive={isModalActive} onHide={hideModal} title={title} icon={<TaskIcon />}>
              <p> {description}</p>
            </Modal>
          )}
          <ConfirmationModal
            title={confirmationModalText.deleteTask}
            onHide={closeConfirmModal}
            isActive={isConfirmModalActive}
            handleCancelClick={closeConfirmModal}
            handleConfirmationClick={removeTask}
          />
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

import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import classes from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useModalState } from '../../../hooks/useModalState';
import ConfirmationModal from '../../../commons/ConfirmationModal';
import { confirmationModalText, toastMessages } from '../../../config/data';
import DeleteButton from '../../../assets/svg/close.svg';
import { deleteTask } from '../../../services/tasks/tasksService';
import { TasksResponse } from '../../../services/tasks/types';
import { ColumnModel } from '../../../helpers/fillColumnWithTasks';
import toast from 'react-hot-toast';

export const Task = (props: ITask): JSX.Element => {
  const { title, boardId, columnId, description, _id: id, index, setColumns } = props;
  const [isModalActive, hideModal, showModal] = useModalState(false);

  const [isConfirmModalActive, closeConfirmModal, showConfirmModal] = useModalState(false);
  console.log(props);
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

  const removeTaskFromColumn = (columnId: string) => {
    setColumns((columns) => {
      const updatedColumnIndex = columns.findIndex((column) => column._id === columnId);
      if (updatedColumnIndex !== -1) {
        const updatedColumns = [...columns];
        updatedColumns[updatedColumnIndex].tasks = updatedColumns[updatedColumnIndex].tasks.filter(
          (task) => task._id !== id
        );
        return updatedColumns;
      }
      return columns;
    });
  };

  const removeTask = async () => {
    closeConfirmModal();
    const res = await deleteTask(boardId, columnId, id);
    if ('code' in res) {
      toast.error(toastMessages.error.unknown);
    } else {
      removeTaskFromColumn(columnId);
      toast.success(toastMessages.success.taskRemoved);
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

export interface ITask extends TasksResponse {
  index: number;
  setColumns: React.Dispatch<React.SetStateAction<ColumnModel[]>>;
}

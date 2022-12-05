import { Button } from 'react-bootstrap';
import Modal from '../../../commons/Modal';
import TaskIcon from '../../../commons/Modal/TaskIcon';
import Task from '../Task';
import Form from '../../../commons/Form';
import classes from './BoardColumn.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TasksResponse } from '../../../services/tasks/types';
import TrashcanIcon from '../../../assets/svg/trash.svg';
import { useModalState } from '../../../hooks/useModalState';
import { useEffect, useState } from 'react';
import { EditInPlace } from './EditInPlace';
import { updateColumnById } from '../../../services/columns/columnsService';
import ConfirmationModal from '../../../commons/ConfirmationModal';
import { confirmationModalText, creationFormData, toastMessages } from '../../../config/data';
import { FormInputNames } from '../../../config/types';
import { createTask } from '../../../services/tasks/tasksService';
import { useAuthContext } from '../../../contexts/auth/authContext';
import toast from 'react-hot-toast';
import { ColumnModel } from '../../../helpers/fillColumnWithTasks';

export const BoardColumn = (props: IColumnProps): JSX.Element => {
  const {
    _id: id,
    index,
    boardId,
    title,
    order,
    tasks,
    onRemove: onColumnRemove,
    setColumns,
  } = props;
  const [isModalActive, closeModal, openModal] = useModalState(false);
  const [isConfirmModalActive, closeConfirmModal, openConfirmModal] = useModalState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const renderTasks = tasks.map((task) => (
    <Task key={task._id} {...task} index={task.order} setColumns={setColumns} />
  ));

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

  const addTaskToColumn = (task: TasksResponse) => {
    setColumns((columns) => {
      const updatedColumnIndex = columns.findIndex((column) => column._id === id);
      if (updatedColumnIndex !== -1) {
        const updatedColumns = [...columns];
        updatedColumns[updatedColumnIndex].tasks.push(task);

        return updatedColumns;
      }

      return columns;
    });
  };

  const addTask = (data: FormInputNames) => {
    setIsLoading(true);
    const { title, description } = data;
    const order = tasks.length;
    const userId = user._id;
    createTask(boardId, id, { title, order, description, userId, users: [] }).then((response) => {
      if (response) {
        if ('code' in response) {
          toast.error(toastMessages.error.unknown);
          setIsLoading(false);
        } else {
          addTaskToColumn(response);
          toast.success(toastMessages.success.taskCreated);
          setIsLoading(false);
        }
      }
    });
    closeModal();
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
            <Form {...creationFormData.task} onSubmit={addTask} onCancel={closeModal} />
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
  setColumns: React.Dispatch<React.SetStateAction<ColumnModel[]>>;
}

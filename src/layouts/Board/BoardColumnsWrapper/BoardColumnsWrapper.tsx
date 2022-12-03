import classes from './BoardColumnsWrapper.module.scss';
import plusButton from '../../../assets/svg/plus.svg';
import Modal from '../../../commons/Modal';
import { useState } from 'react';
import BoardColumn from '../BoardColumn';
import { Droppable } from 'react-beautiful-dnd';
import { creationFormData } from '../../../config/data';
import Form from '../../../commons/Form';
import { ColumnModel } from '../Board';
import { ModalForm } from '../../../config/types';

export const BoardColumnsWrapper = (props: wrapperProps) => {
  const { children, createColumn } = props;
  const [isModalActive, setIsModalActive] = useState(false);
  const showModal = () => {
    //TODO implement logic
    setIsModalActive(true);
  };
  const onHide = () => {
    //TODO implement close modal func
    setIsModalActive(false);
  };
  const onSubmit = (data: ModalForm) => {}; //TODO implement using createColumn

  const onCancel = () => {}; // TODO implement

  return (
    <Droppable droppableId="columns" direction="horizontal" type="column">
      {(provided) => (
        <ul className={classes.columnsWrapper} {...provided.droppableProps} ref={provided.innerRef}>
          {!children && <BoardColumn index={0} _id={'new column'} title="New column" tasks={[]} />}
          {children}
          <li>
            <button className={classes.columnsWrapper__add} onClick={showModal}>
              <img src={plusButton} alt="add column" />
            </button>
          </li>
          <Modal isActive={isModalActive} onHide={onHide} title={creationFormData.task.title}>
            <Form {...creationFormData.task} onSubmit={onSubmit} onCancel={onCancel} />
          </Modal>
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export type wrapperProps = {
  children: React.ReactNode;
  createColumn: (title: string) => ColumnModel;
};

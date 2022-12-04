import classes from './BoardColumnsWrapper.module.scss';
import plusButton from '../../../assets/svg/plus.svg';
import Modal from '../../../commons/Modal';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { creationFormData } from '../../../config/data';
import Form from '../../../commons/Form';
import { ModalForm } from '../../../config/types';

export const BoardColumnsWrapper = (props: wrapperProps) => {
  const { children, addColumn } = props;
  const [isModalActive, setIsModalActive] = useState(false);
  const showModal = () => {
    //TODO implement logic
    setIsModalActive(true);
  };
  const closeModal = () => {
    //TODO implement close modal func
    setIsModalActive(false);
  };
  const onSubmit = (data: ModalForm) => {
    const { title } = data;
    addColumn(title);
    closeModal();
  };

  return (
    <Droppable droppableId="columns" direction="horizontal" type="column">
      {(provided) => (
        <ul className={classes.columnsWrapper} {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
          <li>
            <button className={classes.columnsWrapper__add} onClick={showModal}>
              <img src={plusButton} alt="add column" />
            </button>
          </li>
          <Modal isActive={isModalActive} onHide={closeModal} title={creationFormData.column.title}>
            <Form {...creationFormData.column} onSubmit={onSubmit} onCancel={closeModal} />
          </Modal>
        </ul>
      )}
    </Droppable>
  );
};

export type wrapperProps = {
  children: React.ReactNode;
  addColumn: (title: string) => void;
};

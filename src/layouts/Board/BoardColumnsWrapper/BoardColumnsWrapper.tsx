import classes from './BoardColumnsWrapper.module.scss';
import Modal from '../../../commons/Modal';
import { Droppable } from 'react-beautiful-dnd';
import { creationFormData } from '../../../config/data';
import Form from '../../../commons/Form';
import { FormInputNames } from '../../../config/types';
import { useModalState } from '../../../hooks/useModalState';

export const BoardColumnsWrapper = (props: wrapperProps) => {
  const { children, addColumn } = props;
  const [isModalActive, closeModal, showModal] = useModalState(false);

  const onSubmit = (data: FormInputNames) => {
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
            <button className={classes.columnsWrapper__add} onClick={showModal}></button>
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

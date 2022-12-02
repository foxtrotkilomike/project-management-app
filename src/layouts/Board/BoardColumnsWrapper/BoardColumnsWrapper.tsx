import classes from './BoardColumnsWrapper.module.scss';
import plusButton from '../../../assets/svg/plus.svg';
import Modal from '../../../commons/Modal';
import { useState } from 'react';
import BoardColumn from '../BoardColumn';
import { creationFormData } from '../../../config/data';
import Form from '../../../commons/Form';
import { ColumnModel } from '../Board';

export const BoardColumnsWrapper = (props: wrapperProps) => {
  const { children, pushColumn } = props;
  const [isModalActive, setIsModalActive] = useState(false);
  const showModal = () => {
    //TODO implement logic
    setIsModalActive(true);
  };
  const onHide = () => {
    //TODO implement close modal func
    setIsModalActive(false);
  };

  return (
    <ul className={classes.columnsWrapper}>
      {!children && <BoardColumn title="New column" tasks={[]} />}
      {children}
      <li>
        <button className={classes.columnsWrapper__add} onClick={showModal}>
          <img src={plusButton} alt="add column" />
        </button>
      </li>
      <Modal isActive={isModalActive} onHide={onHide} title={creationFormData.task.title}>
        <Form {...creationFormData.task} onFormSubmit={pushColumn} />
      </Modal>
    </ul>
  );
};

export type wrapperProps = {
  children: React.ReactNode;
  pushColumn: (column: ColumnModel) => void;
};

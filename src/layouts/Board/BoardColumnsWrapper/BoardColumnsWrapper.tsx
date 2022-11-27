import classes from './BoardColumnsWrapper.module.scss';
import plusButton from '../../../assets/svg/plus.svg';
import Modal from '../../../commons/Modal';
import { useState } from 'react';

export const BoardColumnsWrapper = (props: wrapperProps) => {
  const children = props.children;
  const [isModalActive, setIsModalActive] = useState(false);
  const addColumn = () => {
    //TODO implement add column
    setIsModalActive(true);
  };
  const onHide = () => {
    //TODO implement close modal func
    setIsModalActive(false);
  };
  return (
    <ul className={classes.columnsWrapper}>
      {children}
      <li>
        <button className={classes.add} onClick={addColumn}>
          <img src={plusButton} alt="add column" />
        </button>
      </li>
      <Modal isActive={isModalActive} onHide={onHide} title="New column">
        {/* TODO: add form */}
        Column adding form
      </Modal>
    </ul>
  );
};

export type wrapperProps = {
  children: React.ReactNode;
};

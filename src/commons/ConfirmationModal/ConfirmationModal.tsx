import classes from './ConfirmationModal.module.scss';
import { Button } from 'react-bootstrap';
import Modal from '../Modal';
import React from 'react';
import { confirmationModalButtonsText } from '../../config/data';

export const ConfirmationModal = (props: ConfirmationModalProps): JSX.Element => {
  const {
    title,
    onHide,
    isActive,
    handleCancelClick,
    handleConfirmationClick,
    cancelButtonText,
    confirmationButtonText,
  } = props;

  return (
    <Modal title={title} onHide={onHide} isActive={isActive}>
      <div className={classes.buttons}>
        <Button variant="danger" className={classes.cancel} onClick={handleCancelClick}>
          {cancelButtonText || confirmationModalButtonsText.cancel}
        </Button>
        <Button variant="success" className={classes.submit} onClick={handleConfirmationClick}>
          {confirmationButtonText || confirmationModalButtonsText.submit}
        </Button>
      </div>
    </Modal>
  );
};

type ConfirmationModalProps = {
  title: string;
  onHide: () => void;
  isActive: boolean;
  handleCancelClick: () => void;
  handleConfirmationClick: () => void;
  cancelButtonText?: string;
  confirmationButtonText?: string;
};

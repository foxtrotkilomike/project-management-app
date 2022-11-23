import { FC } from 'react';
import { ModalBody, ModalHeader } from 'react-bootstrap';
import BootstrapModal from 'react-bootstrap/Modal';
import classes from './Modal.module.scss';

export type ModalProps = {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive: boolean;
  onHide: () => void;
};

export const Modal: FC<ModalProps> = (props) => {
  const { title, children, icon, isActive, onHide } = props;
  return (
    <BootstrapModal
      show={isActive}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={classes.modalContent}
      backdropClassName={classes.overlay}
    >
      <ModalHeader bsPrefix={`modal-header ${classes.modalHeader}`}>
        {icon && <div className={classes.modalIcon}>{icon}</div>}
        <h4 className={classes.modalHeader}>{title}</h4>
      </ModalHeader>
      <ModalBody bsPrefix={`modal-body ${classes.modalBody}`}>{children}</ModalBody>
    </BootstrapModal>
  );
};

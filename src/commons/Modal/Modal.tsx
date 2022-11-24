import { ModalBody, ModalHeader } from 'react-bootstrap';
import BootstrapModal from 'react-bootstrap/Modal';
import classes from './Modal.module.scss';

export const Modal = (props: ModalProps): JSX.Element => {
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
      <ModalHeader className={classes.modalHeader}>
        {icon && <div className={classes.modalIcon}>{icon}</div>}
        <h4>{title}</h4>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </BootstrapModal>
  );
};

export type ModalProps = {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive: boolean;
  onHide: () => void;
};

import classes from './Header.module.scss';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import clearUserData from '../../helpers/clearUserData';
import {
  buttonsText,
  confirmationModalText,
  creationFormData,
  toastMessages,
} from '../../config/data';
import { routes } from '../../config/routes';
import ConfirmationModal from '../../commons/ConfirmationModal';
import { useModalState } from '../../hooks/useModalState';
import Form from '../../commons/Form';
import Modal from '../../commons/Modal';
import { useAuthContext } from '../../contexts/auth/authContext';
import { FormInputNames } from '../../config/types';
import { createBoard as postBoardData } from '../../services/boards/boardsService';

export const AuthorizedUserButtons = ({
  setIsBurgerActive,
}: AuthorizedUserButtonsProps): JSX.Element => {
  const navigate = useNavigate();
  const [isModalActive, closeModal, openModal] = useModalState(false);
  const [isConfirmModalActive, closeConfirmModal, openConfirmModal] = useModalState(false);
  const { user } = useAuthContext();

  const handleCreateBoardClick = () => {
    setIsBurgerActive(false);
    openModal();
  };

  const navigateProfileEdit = () => {
    navigate(routes.PROFILE_EDIT);
    setIsBurgerActive(false);
  };

  const navigateMainPage = () => {
    navigate(routes.BOARDS);
    setIsBurgerActive(false);
  };

  const handleSignOutClick = () => {
    setIsBurgerActive(false);
    openConfirmModal();
  };

  const signOutUser = () => {
    closeConfirmModal();
    clearUserData();
    toast.success(toastMessages.success.logout);
    navigate(routes.MAIN);
  };

  const createBoard = (data: FormInputNames) => {
    const newBoard = {
      owner: user.login,
      title: data.title,
      users: [],
    };

    postBoardData(newBoard).then((res) => {
      if ('code' in res) {
        toast.error(toastMessages.error.unknown);
      } else {
        toast.success(toastMessages.success.boardCreated);
        closeModal();
        navigate(routes.BOARDS);
      }
    });
  };

  return (
    <>
      <Button variant="header-primary" onClick={handleCreateBoardClick}>
        {buttonsText.createBoard}
      </Button>
      <Button variant="header-secondary" onClick={navigateProfileEdit}>
        {buttonsText.editProfile}
      </Button>
      <Button variant="header-secondary" onClick={navigateMainPage}>
        {buttonsText.mainPage}
      </Button>
      <Button
        variant="header-secondary"
        className={classes.signOutBtn}
        onClick={handleSignOutClick}
      >
        {buttonsText.signOut}
      </Button>
      <ConfirmationModal
        title={confirmationModalText.signOut}
        onHide={closeConfirmModal}
        isActive={isConfirmModalActive}
        handleCancelClick={closeConfirmModal}
        handleConfirmationClick={signOutUser}
      />
      <Modal isActive={isModalActive} onHide={closeModal} title={creationFormData.board.title}>
        <Form
          fields={creationFormData.board.fields}
          onSubmit={createBoard}
          onCancel={closeModal}
        ></Form>
      </Modal>
    </>
  );
};

type AuthorizedUserButtonsProps = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

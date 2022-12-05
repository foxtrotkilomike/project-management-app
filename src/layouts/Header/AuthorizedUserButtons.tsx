import classes from './Header.module.scss';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import clearUserData from '../../helpers/clearUserData';
import { buttonsText, confirmationModalText, toastMessages } from '../../config/data';
import { routes } from '../../config/routes';
import ConfirmationModal from '../../commons/ConfirmationModal';
import { useModalState } from '../../hooks/useModalState';

export const AuthorizedUserButtons = ({
  setIsBurgerActive,
}: AuthorizedUserButtonsProps): JSX.Element => {
  const navigate = useNavigate();
  const [isModalActive, closeModal, openModal] = useModalState(false);

  const createBoard = () => {
    setIsBurgerActive(false);
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
    openModal();
  };

  const signOutUser = () => {
    closeModal();
    clearUserData();
    toast.success(toastMessages.success.logout);
    navigate(routes.MAIN);
  };

  return (
    <>
      <Button variant="header-primary" onClick={createBoard}>
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
        onHide={closeModal}
        isActive={isModalActive}
        handleCancelClick={closeModal}
        handleConfirmationClick={signOutUser}
      />
    </>
  );
};

type AuthorizedUserButtonsProps = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

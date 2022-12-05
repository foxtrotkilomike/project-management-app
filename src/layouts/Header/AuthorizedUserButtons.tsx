import classes from './Header.module.scss';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import clearUserData from '../../helpers/clearUserData';
import { buttonsText, toastMessages } from '../../config/data';
import { routes } from '../../config/routes';

export const AuthorizedUserButtons = ({
  setIsBurgerActive,
}: AuthorizedUserButtonsProps): JSX.Element => {
  const navigate = useNavigate();

  const createBoard = () => {
    setIsBurgerActive(false);
  };

  const navigateProfileEdit = () => {
    navigate(routes.PROFILE);
    setIsBurgerActive(false);
  };

  const navigateMainPage = () => {
    navigate(routes.MAIN);
    setIsBurgerActive(false);
  };

  const signOutUser = () => {
    setIsBurgerActive(false);
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
      <Button variant="header-secondary" className={classes.signOutBtn} onClick={signOutUser}>
        {buttonsText.signOut}
      </Button>
    </>
  );
};

type AuthorizedUserButtonsProps = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

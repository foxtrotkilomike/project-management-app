import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { buttonsText } from '../../config/data';
import { routes } from '../../config/routes';
import classes from './Header.module.scss';

export const AuthorizedUserButtons = ({ setIsBurgerActive }: Props): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="header-primary"
        onClick={() => {
          setIsBurgerActive(false);
        }}
      >
        {buttonsText.createBoard}
      </Button>
      <Button
        variant="header-secondary"
        onClick={() => {
          navigate(routes.PROFILE);
          setIsBurgerActive(false);
        }}
      >
        {buttonsText.editProfile}
      </Button>
      <Button
        variant="header-secondary"
        onClick={() => {
          navigate(routes.MAIN);
          setIsBurgerActive(false);
        }}
      >
        {buttonsText.mainPage}
      </Button>
      <Button
        variant="header-secondary"
        className={classes.signOutBtn}
        onClick={() => {
          navigate(routes.MAIN);
          setIsBurgerActive(false);
        }}
      >
        {buttonsText.signOut}
      </Button>
    </>
  );
};

type Props = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

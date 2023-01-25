import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { buttonsText } from '../../config/data';
import { routes } from '../../config/routes';

export const NotAuthorizedUserButtons = ({
  setIsBurgerActive,
}: NotAuthorizedUserButtonsProps): JSX.Element => {
  const navigate = useNavigate();

  const navigateSignUp = () => {
    navigate(routes.SIGN_UP);
    setIsBurgerActive(false);
  };

  const navigateSignIn = () => {
    navigate(routes.SIGN_IN);
    setIsBurgerActive(false);
  };

  return (
    <>
      <Button variant="header-primary" onClick={navigateSignUp}>
        {buttonsText.signUp}
      </Button>
      <Button variant="header-secondary" onClick={navigateSignIn}>
        {buttonsText.signIn}
      </Button>
    </>
  );
};

type NotAuthorizedUserButtonsProps = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

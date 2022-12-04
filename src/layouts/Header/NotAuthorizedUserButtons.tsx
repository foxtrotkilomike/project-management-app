import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { buttonsText } from '../../config/data';
import { routes } from '../../config/routes';

export const NotAuthorizedUserButtons = ({ setIsBurgerActive }: Props): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="header-primary"
        onClick={() => {
          navigate(routes.SIGN_UP);
          setIsBurgerActive(false);
        }}
      >
        {buttonsText.signUp}
      </Button>
      <Button
        variant="header-secondary"
        onClick={() => {
          navigate(routes.SIGN_IN);
          setIsBurgerActive(false);
        }}
      >
        {buttonsText.signIn}
      </Button>
    </>
  );
};

type Props = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

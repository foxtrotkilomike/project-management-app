import { checkUserCredentials } from '../../services/authService';
import { NotAuthorizedUserButtons } from './NotAuthorizedUserButtons';
import { AuthorizedUserButtons } from './AuthorizedUserButtons';

export const HeaderButtons = ({ setIsBurgerActive }: Props): JSX.Element => {
  const isAuthorizedUser = checkUserCredentials();

  return (
    <>
      {isAuthorizedUser ? (
        <AuthorizedUserButtons setIsBurgerActive={setIsBurgerActive} />
      ) : (
        <NotAuthorizedUserButtons setIsBurgerActive={setIsBurgerActive} />
      )}
    </>
  );
};

type Props = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

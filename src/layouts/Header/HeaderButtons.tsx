import { checkUserCredentials } from '../../services/authService';
import { NotAuthorizedUserButtons } from './NotAuthorizedUserButtons';
import { AuthorizedUserButtons } from './AuthorizedUserButtons';

export const HeaderButtons = ({ setIsBurgerActive }: HeaderButtonsProps): JSX.Element => {
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

type HeaderButtonsProps = {
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

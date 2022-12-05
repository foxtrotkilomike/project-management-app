import classes from './LoginPrompt.module.scss';
import { Link } from 'react-router-dom';
import { LoginFormType } from '../../config/types';
import { loginPromptData } from '../../config/data';
import { routes } from '../../config/routes';

export const LoginPrompt = ({ type }: LoginPromptProps): JSX.Element => {
  const { prompt, linkText } = loginPromptData[type];
  const route = type === 'signUp' ? routes.SIGN_IN : routes.SIGN_UP;

  return (
    <p className={classes.loginPrompt}>
      {prompt}{' '}
      <Link to={route} className={classes.loginPrompt__link}>
        {linkText}
      </Link>
    </p>
  );
};

export type LoginPromptProps = {
  type: LoginFormType;
};

export type LoginPromptData = {
  prompt: string;
  linkText: string;
};

import { LoginFormType } from '../../config/types';

import NavigationButton from '../../commons/NavigationButton';
import LoginForm from '../../commons/LoginForm';
import LoginPrompt from '../../commons/LoginPrompt';

import ArrowLeftIcon from '../../assets/svg/arrow-left.svg';
import { routes } from '../../config/routes';
import { loginHeading } from '../../config/data';
import TwoColumnsFlex from '../TwoColumnsFlex';

export const LogIn = ({ type }: LogInProps): JSX.Element => {
  const leftColumn = (
    <NavigationButton
      location={routes.MAIN}
      size="lg"
      icon={ArrowLeftIcon}
      text="Back"
      ariaLabel="Navigate back"
    />
  );

  const rightColumn = (
    <>
      <h1>{loginHeading[type]}</h1>
      <LoginForm type={type} />
      <LoginPrompt type={type} />
    </>
  );

  return <TwoColumnsFlex leftColumn={leftColumn} rightColumn={rightColumn} />;
};

type LogInProps = {
  type: LoginFormType;
};

import classes from './LogIn.module.scss';
import { LoginFormType } from '../../config/types';

import NavigationButton from '../../commons/NavigationButton';
import Container from '../../commons/Container';
import LoginForm from '../../commons/LoginForm';
import LoginPrompt from '../../commons/LoginPrompt';

import ArrowLeftIcon from '../../assets/svg/arrow-left.svg';
import { routes } from '../../config/routes';
import { loginHeading } from '../../config/data';

export const LogIn = ({ type }: LogInProps): JSX.Element => {
  return (
    <Container centered main growing>
      <div className={classes.logIn__wrapper}>
        <aside>
          <NavigationButton
            location={routes.MAIN}
            size="lg"
            icon={ArrowLeftIcon}
            text="Back"
            ariaLabel="Navigate back"
          />
        </aside>
        <main className={classes.mainContent}>
          <Container centered>
            <h1>{loginHeading[type]}</h1>
            <LoginForm type={type} />
            <LoginPrompt type={type} />
          </Container>
        </main>
      </div>
    </Container>
  );
};

type LogInProps = {
  type: LoginFormType;
};
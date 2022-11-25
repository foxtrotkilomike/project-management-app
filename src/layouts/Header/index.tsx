import classes from './Header.module.scss';
import { buttonsText, selectData } from '../../config/data';
import Select from '../../commons/Select';
import Logo from '../../commons/Logo';
import Container from '../../commons/Container';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';

const Header = (props: Props): JSX.Element => {
  const { sticky } = props;
  const headerClassName = classNames(classes.root, {
    [classes.headerSticky]: sticky,
  });
  const languageSelectData = selectData[0];

  return (
    <header className={headerClassName}>
      <Container centered main>
        <div className={classes.headerContent}>
          <Logo />
          <div className={classes.buttonsContainer}>
            <Button variant="primary" onClick={() => {}}>
              {buttonsText.signUp}
            </Button>
            <Button variant="outline-secondary" onClick={() => {}}>
              {buttonsText.signIn}
            </Button>
            <Select {...languageSelectData} activeOptionIndex={0} />
          </div>
        </div>
      </Container>
    </header>
  );
};

type Props = {
  sticky?: boolean;
};

export default Header;

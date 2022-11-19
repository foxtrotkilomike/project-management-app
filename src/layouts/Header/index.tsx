import classes from './Header.module.scss';
import { buttonsText, selectData } from '../../config/data';
import Button from '../../commons/Button';
import Select from '../../commons/Select';
import Logo from '../../commons/Logo';
import Container from '../../commons/Container';
import classNames from 'classnames';

const Header = (props: Props): JSX.Element => {
  const { sticky } = props;
  const headerClassName = classNames(classes.root, {
    [classes.headerSticky]: sticky,
  });
  const languageSelectData = selectData[0];

  return (
    <header className={headerClassName}>
      <Container centered>
        <div className={classes.headerContent}>
          <Logo />
          <div className={classes.buttonsContainer}>
            <Button filled onClick={() => {}}>
              {buttonsText.signUp}
            </Button>
            <Button contour onClick={() => {}}>
              {buttonsText.signIn}
            </Button>
            <Select {...languageSelectData} />
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

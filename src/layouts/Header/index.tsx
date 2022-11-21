import classes from './Header.module.scss';
import { buttonsText, selectData } from '../../config/data';
import Button from '../../commons/Button';
import Select from '../../commons/Select';
import Logo from '../../commons/Logo';
import Container from '../../commons/Container';
import classNames from 'classnames';

import GlobeIcon from '../../assets/svg/globe2.svg';

const Header = (props: Props): JSX.Element => {
  const { sticky } = props;
  const headerClassName = classNames(classes.root, {
    [classes.headerSticky]: sticky,
  });

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
            <Select
              labelType="icon"
              options={selectData[0].options}
              activeOptionIndex={0}
              ariaLabel={'Lang'}
              icon={GlobeIcon}
            />
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

import classes from './Header.module.scss';
import { buttonsText, selectData } from '../../config/data';
import Button from '../../commons/Button';
import Select from '../../commons/Select';
import Logo from '../../commons/Logo';
import CenteredContainer from '../../commons/CenteredContainer';

const Header = ({ sticky }: Props): JSX.Element => {
  const headerClassName = sticky ? `${classes.header} ${classes.headerSticky}` : classes.header;
  const languageSelectData = selectData[0];

  return (
    <header className={headerClassName}>
      <CenteredContainer>
        <div className={classes.headerContent}>
          <Logo />
          <div className={classes.buttonsContainer}>
            <Button type="filled" onClick={() => {}}>
              {buttonsText.signUp}
            </Button>
            <Button type="contour" onClick={() => {}}>
              {buttonsText.signIn}
            </Button>
            <Select {...languageSelectData} />
          </div>
        </div>
      </CenteredContainer>
    </header>
  );
};

type Props = {
  sticky?: boolean;
};

export default Header;

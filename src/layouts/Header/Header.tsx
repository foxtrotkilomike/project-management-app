import { useState } from 'react';
import classes from './Header.module.scss';
import { selectData } from '../../config/data';
import { useHeaderColor } from '../../hooks/useHeaderColor';
import { HeaderButtons } from './HeaderButtons';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';
import Select from '../../commons/Select';
import BurgerMenu from './BurgerMenu';
import Logo from '../../commons/Logo';
import Container from '../../commons/Container';
import classNames from 'classnames';

export const Header = (): JSX.Element => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const isPrivateRoute = usePrivateRoute();
  const headerClassName = classNames(classes.root, {
    [classes.headerSticky]: isPrivateRoute,
  });
  const classNav = classNames(classes.buttonsContainer, {
    [classes.buttonsContainer_active]: isBurgerActive,
  });
  const languageSelectData = selectData[0];
  const privateHeaderColor = useHeaderColor();
  const color = isPrivateRoute ? privateHeaderColor : '#fce9df';

  return (
    <header className={headerClassName} style={{ backgroundColor: color }}>
      <Container centered main>
        <div className={classes.headerContent}>
          <BurgerMenu isBurgerActive={isBurgerActive} setIsBurgerActive={setIsBurgerActive} />
          <div
            aria-hidden={true}
            className={classes.navBackground}
            onClick={() => setIsBurgerActive(false)}
          />
          <Logo />
          <div className={classNav}>
            <HeaderButtons setIsBurgerActive={setIsBurgerActive} />
          </div>
          <Select {...languageSelectData} activeOptionIndex={0} />
        </div>
      </Container>
    </header>
  );
};

type Props = {
  sticky?: boolean;
};

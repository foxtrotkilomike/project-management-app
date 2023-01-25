import classes from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { selectData } from '../../config/data';
import { useHeaderColor } from '../../hooks/useHeaderColor';
import { HeaderButtons } from './HeaderButtons';
import { usePrivateRoute } from '../../hooks/usePrivateRoute';
import Select from '../../commons/Select';
import BurgerMenu from './BurgerMenu';
import Logo from '../../commons/Logo';
import Container from '../../commons/Container';
import { PUBLIC_HEADER_COLOR } from '../../config/constants';

export const Header = (): JSX.Element => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const isPrivateRoute = usePrivateRoute();
  const headerClassName = classNames(classes.root, {
    [classes.headerSticky]: isPrivateRoute,
  });
  const navClassName = classNames(classes.buttonsContainer, {
    [classes.buttonsContainer_active]: isBurgerActive,
  });
  const languageSelectData = selectData.language;
  const privateHeaderColor = useHeaderColor();
  const color = isPrivateRoute ? privateHeaderColor : PUBLIC_HEADER_COLOR;

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
          <div className={navClassName}>
            <HeaderButtons setIsBurgerActive={setIsBurgerActive} />
          </div>
          <Select {...languageSelectData} activeOptionIndex={0} />
        </div>
      </Container>
    </header>
  );
};

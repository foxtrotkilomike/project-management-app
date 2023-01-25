import classes from './Header.module.scss';
import classNames from 'classnames';

const BurgerMenu = ({ isBurgerActive, setIsBurgerActive }: BurgerMenuProps): JSX.Element => {
  const className = classNames(classes.burger, {
    [classes.burger_open]: isBurgerActive,
  });

  return (
    <button className={className} onClick={() => setIsBurgerActive(!isBurgerActive)}>
      <span className={classes.burger__line}></span>
      <span className={classes.burger__line}></span>
      <span className={classes.burger__line}></span>
    </button>
  );
};

type BurgerMenuProps = {
  isBurgerActive: boolean;
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

export default BurgerMenu;

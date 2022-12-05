import classes from './Header.module.scss';
import classNames from 'classnames';

type Props = {
  isBurgerActive: boolean;
  setIsBurgerActive: (isBurgerActive: boolean) => void;
};

const BurgerMenu = ({ isBurgerActive, setIsBurgerActive }: Props): JSX.Element => {
  const className = classNames(classes.burger, {
    [classes.burger_open]: isBurgerActive,
  });

  return (
    <button
      className={className}
      onClick={() => {
        setIsBurgerActive(!isBurgerActive);
      }}
    >
      <span className={classes.burger__line}></span>
      <span className={classes.burger__line}></span>
      <span className={classes.burger__line}></span>
    </button>
  );
};

export default BurgerMenu;

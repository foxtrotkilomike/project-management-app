import classes from './NavigationButton.module.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationButton = (props: NavigationButtonProps): JSX.Element => {
  const { to, size, icon, text } = props;

  return (
    <Link to={to}>
      <Button variant="nav" size={size} className={classes.navButton}>
        {icon && <img src={icon} className={classes.navButton__icon} alt="" />}
        {text}
      </Button>
    </Link>
  );
};

type NavigationButtonProps = {
  to: string;
  size?: 'sm' | 'lg';
  text?: string;
  icon?: string;
};

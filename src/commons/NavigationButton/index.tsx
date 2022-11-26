import classes from './NavigationButton.module.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationButton = (props: NavigationButtonProps): JSX.Element => {
  const { location, size, icon, text, ariaLabel } = props;

  return (
    <Link to={location}>
      <Button variant="nav" size={size} className={classes.navButton} aria-label={ariaLabel}>
        {icon && <img src={icon} className={classes.navButton__icon} alt="" />}
        {text}
      </Button>
    </Link>
  );
};

type NavigationButtonProps = {
  location: string;
  size?: 'sm' | 'lg';
  text?: string;
  icon?: string;
  ariaLabel: string;
};

export default NavigationButton;

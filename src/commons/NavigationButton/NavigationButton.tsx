import classes from './NavigationButton.module.scss';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const NavigationButton = (props: NavigationButtonProps): JSX.Element => {
  const { location, size, icon, text, ariaLabel } = props;
  const navigate = useNavigate();

  const renderButton = (onClick: () => void) => (
    <Button
      onClick={onClick}
      variant="nav"
      size={size}
      className={classes.navButton}
      aria-label={ariaLabel}
    >
      {icon && <img src={icon} className={classes.navButton__icon} alt="" aria-hidden={true} />}
      {text}
    </Button>
  );

  if (typeof location === 'number') {
    return renderButton(() => navigate(location));
  }

  return <Link to={location}>{renderButton(() => {})}</Link>;
};

type NavigationButtonProps = {
  location: string | number;
  size?: 'sm' | 'lg';
  text?: string;
  icon?: string;
  ariaLabel: string;
};

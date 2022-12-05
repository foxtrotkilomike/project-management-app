import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';
import classes from './Logo.module.scss';

export const Logo = (): JSX.Element => <Link to={routes.MAIN} className={classes.logo} />;

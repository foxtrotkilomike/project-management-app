import classes from './Welcome.module.scss';

const Welcome = ({}: Props): JSX.Element => {
  return <div className={classes.root}>This is Welcome page</div>;
};

type Props = Record<string, string>;

export default Welcome;

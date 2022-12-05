import classes from './BoardsWrapper.module.scss';

export const BoardsWrapper = (props: BoardWrapperProps): JSX.Element => {
  const children = props.children;

  return <div className={classes.wrapper}>{children}</div>;
};

export type BoardWrapperProps = {
  children: React.ReactNode;
};

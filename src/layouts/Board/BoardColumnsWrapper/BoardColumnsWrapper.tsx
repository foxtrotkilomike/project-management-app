import classes from './BoardColumnsWrapper.module.scss';

export const BoardColumnsWrapper = (props: wrapperProps) => {
  const children = props.children;

  return <ul className={classes.columnsWrapper}>{children}</ul>;
};

export type wrapperProps = {
  children: React.ReactNode;
};

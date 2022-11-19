import React from 'react';
import classes from './Container.module.scss';

const Container = (props: Props): JSX.Element => {
  const { children } = props;

  return <div className={classes.centeredContainer}>{children}</div>;
};

type Props = {
  children: React.ReactNode;
};

export default Container;

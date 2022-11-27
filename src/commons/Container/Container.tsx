import React from 'react';
import classNames from 'classnames';

import classes from './Container.module.scss';

export const Container = (props: ContainerProps): JSX.Element => {
  const { centered, main, growing, minHeight, children } = props;
  const className = classNames({
    [classes.centered]: centered,
    [classes.main]: main,
    [classes.growing]: growing,
    [classes.minHeight]: minHeight,
  });

  return <div className={className}>{children}</div>;
};

type ContainerProps = {
  centered?: boolean;
  main?: boolean;
  growing?: boolean;
  minHeight?: boolean;
  children: React.ReactNode;
};

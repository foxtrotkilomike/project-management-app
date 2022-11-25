import React from 'react';
import classNames from 'classnames';

import classes from './Container.module.scss';

const Container = (props: ContainerProps): JSX.Element => {
  const { centered, main, growing, children } = props;
  const className = classNames({
    [classes.centered]: centered,
    [classes.main]: main,
    [classes.growing]: growing,
  });

  return <div className={className}>{children}</div>;
};

type ContainerProps = {
  centered?: boolean;
  main?: boolean;
  growing?: boolean;
  children: React.ReactNode;
};

export default Container;

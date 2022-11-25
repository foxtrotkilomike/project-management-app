import React from 'react';
import classNames from 'classnames';

import classes from './Container.module.scss';

const Container = (props: ContainerProps): JSX.Element => {
  const { centered, main, grow, children } = props;
  const className = classNames({
    [classes.centered]: centered,
    [classes.main]: main,
    [classes.grow]: grow,
  });

  return <div className={className}>{children}</div>;
};

type ContainerProps = {
  centered?: boolean;
  main?: boolean;
  grow?: boolean;
  children: React.ReactNode;
};

export default Container;

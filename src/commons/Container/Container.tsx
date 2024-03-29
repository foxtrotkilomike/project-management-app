import React from 'react';
import classNames from 'classnames';

import classes from './Container.module.scss';

export const Container = (props: ContainerProps): JSX.Element => {
  const { centered, main, growing, minHeight, textAlignCenter, children } = props;
  const className = classNames({
    [classes.centered]: centered,
    [classes.main]: main,
    [classes.growing]: growing,
    [classes.textCenter]: textAlignCenter,
  });

  const style = minHeight ? { minHeight: `${minHeight}px` } : {};

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

type ContainerProps = {
  centered?: boolean;
  main?: boolean;
  growing?: boolean;
  minHeight?: number;
  textAlignCenter?: boolean;
  children: React.ReactNode;
};

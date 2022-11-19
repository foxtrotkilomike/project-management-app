import React from 'react';
import classNames from 'classnames';

import classes from './Container.module.scss';

const Container = (props: Props): JSX.Element => {
  const { centered, children } = props;
  const className = classNames({
    [classes.centered]: centered,
  });

  return <div className={className}>{children}</div>;
};

type Props = {
  centered?: boolean;
  children: React.ReactNode;
};

export default Container;

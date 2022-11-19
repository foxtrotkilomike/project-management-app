import React, { MouseEvent } from 'react';
import classNames from 'classnames';

import classes from './Button.module.scss';

const Button = (props: Props): JSX.Element => {
  const { filled, contour, onClick, children } = props;
  const className = classNames(classes.root, {
    [classes.filled]: filled,
    [classes.contour]: contour,
  });

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

type Props = {
  filled?: boolean;
  contour?: boolean;
  onClick: (e: MouseEvent) => void;
  children: React.ReactNode;
};

export default Button;

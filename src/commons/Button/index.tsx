import classes from './Button.module.scss';

import React, { MouseEvent } from 'react';
import { ButtonTypes } from '../../config/types';

const Button = ({ type, onClick, children }: Props): JSX.Element => {
  const classNameMap: Record<typeof type, string> = {
    filled: `${classes.btn} ${classes.filled}`,
    contour: `${classes.btn} ${classes.contour}`,
  };

  return (
    <button className={classNameMap[type]} onClick={onClick}>
      {children}
    </button>
  );
};

type Props = {
  type: ButtonTypes;
  onClick: (e: MouseEvent) => void;
  children: React.ReactNode;
};

export default Button;

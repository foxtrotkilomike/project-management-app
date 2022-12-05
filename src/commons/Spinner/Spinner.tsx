import React from 'react';
import classNames from 'classnames';
import classes from './Spinner.module.scss';

export const Spinner = (): JSX.Element => {
  const className = classNames(classes.spinner, classes.active);

  return (
    <div className={className}>
      <span className={classes.spinner__img}></span>
    </div>
  );
};

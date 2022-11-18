import React from 'react';
import classes from './CenteredContainer.module.scss';

const CenteredContainer = ({ children }: Props): JSX.Element => (
  <div className={classes.centeredContainer}>{children}</div>
);

type Props = {
  children: React.ReactNode;
};

export default CenteredContainer;

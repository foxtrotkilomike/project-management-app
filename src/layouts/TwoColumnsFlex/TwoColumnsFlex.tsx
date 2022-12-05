import React from 'react';
import classes from './TwoColumnsFlex.module.scss';

import Container from '../../commons/Container';

export const TwoColumnsFlex = (props: TwoColumnsFlexProps): JSX.Element => {
  const { leftColumn, rightColumn } = props;

  return (
    <Container centered main growing>
      <div className={classes.wrapper}>
        <aside>{leftColumn}</aside>
        <main className={classes.mainContent}>
          <Container centered>{rightColumn}</Container>
        </main>
      </div>
    </Container>
  );
};

type TwoColumnsFlexProps = {
  leftColumn: React.ReactElement;
  rightColumn: React.ReactElement;
};

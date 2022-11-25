import { Container } from 'react-bootstrap';
import classes from './Board.module.scss';
import BoardColumn from './BoardColumn';

export const Board = (): JSX.Element => {
  return (
    <div className={classes.root}>
      <h1>Board title</h1>
      <BoardColumn title="Column 1" tasks={['task1', 'task2', 'task3']} />
    </div>
  );
};

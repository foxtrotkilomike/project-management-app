import classes from './Board.module.scss';

const Board = ({}: Props): JSX.Element => {
  return (
    <div className={classes.root}>
      This is a Board page
      {/*
        Here will be a title of the board + columns list with tasks
        <Typography heading medium />
        <BoardColumns />
      */}
    </div>
  );
};

type Props = Record<string, string>;

export default Board;

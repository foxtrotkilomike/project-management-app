import classes from './Boards.module.scss';

export async function loader() {
  throw new Error();
}

const Boards = ({}: Props): JSX.Element => {
  return (
    <div className={classes.root}>
      Boards page
      {/*
        Here will be a title + boards list
        <Typography heading large />
        <Boards />
      */}
    </div>
  );
};

type Props = Record<string, string>;

export default Boards;

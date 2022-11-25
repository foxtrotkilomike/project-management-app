import classes from './Board.module.scss';
import BoardColumn from './BoardColumn';
import { BoardColumnProps } from './BoardColumn/BoardColumn';
import BoardColumnsWrapper from './BoardColumnsWrapper';


export const Board = (props: BoardProps): JSX.Element => {
  const { title, columns } = props;

  const renderColumns = columns.map((column) => <BoardColumn key={column.title} {...column} />);
  return (
    <div className={classes.root}>
      <h1>{title}</h1>
      <BoardColumnsWrapper>
        {renderColumns}
      </BoardColumnsWrapper>
    </div>
  );
};

export type BoardProps = {
  title: string;
  columns: BoardColumnProps[];
} 

import classes from './BoardColumn.module.scss';

export const BoardColumn = (props: BoardColumnProps): JSX.Element => {
  const { title, tasks } = props;

  const taskCards = tasks.map((item) => <div key={item}> {item}</div>);

  return (
    <div className={classes.column}>
      <div className={classes.header}>{title}</div>
      <div className={classes.tasksWrapper}>{taskCards}</div>
    </div>
  );
};

export type BoardColumnProps = {
  title: string;
  tasks: string[];
};

export interface ITask {
  id: string;
  title: string;
  description: string;
}

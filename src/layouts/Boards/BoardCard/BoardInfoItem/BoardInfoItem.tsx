import classes from './BoardInfoItem.module.scss';

export const BoardInfoItem = (props: BoardInfoItemProps): JSX.Element => {
  const { name, value } = props;
  return (
    <div className={classes.infoItem}>
      <span className={classes.infoItem__text}>{name}</span>
      <span className={classes.infoItem__dot} />
      <span className={classes.infoItem__quantity}>{value}</span>
    </div>
  );
};

export type BoardInfoItemProps = {
  name: string;
  value: number | string;
};

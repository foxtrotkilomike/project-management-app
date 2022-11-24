import classes from './BoardInfoItem.module.scss';

export const BoardInfoItem = (props: BoardInfoItemProps): JSX.Element => {
  const { propertyName, value } = props;
  return (
    <div className={classes.infoItem}>
      <span className={classes.infoItem__text}>{propertyName}</span>
      <span className={classes.infoItem__quantity}>{value}</span>
    </div>
  );
};

export type BoardInfoItemProps = {
  propertyName: string;
  value: number;
};

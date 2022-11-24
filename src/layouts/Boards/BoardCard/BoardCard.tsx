import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './BoardCard.module.scss';
import BoardInfoItem from './BoardInfoItem';
import { BoardInfoItemProps } from './BoardInfoItem/BoardInfoItem';
import TrashcanIcon from '../../../assets/svg/trash.svg';
import classNames from 'classnames';

export const BoardCard = (props: BoardProps): JSX.Element => {
  const { onRemove, title, infoObject } = props;

  const description = infoObject.map((item) => (
    <BoardInfoItem key={item.propertyName} propertyName={item.propertyName} value={item.value} />
  ));

  const iconClassnames = classNames(classes.button, classes.deleteIcon);

  return (
    <Card className={classes.boardCard}>
      <Card.Body className={classes.boardCard__content}>
        <div className={classes.boardCard__header}>
          <Card.Title className={classes.boardCard__title}>{title}</Card.Title>
          <Button className={classes.button} variant="outline-danger" onClick={onRemove}>
            Remove
          </Button>
          <Button className={iconClassnames} variant="outline-danger" onClick={onRemove}>
            <img src={TrashcanIcon} alt="Remove" />
          </Button>
        </div>
        <Card.Text className={classes.boardCard__info}>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export type BoardProps = {
  title: string;
  infoObject: BoardInfoItemProps[];
  onRemove: (e: React.SyntheticEvent) => void;
};

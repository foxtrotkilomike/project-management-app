import { ReactNode, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from './BoardCard.module.scss';
import BoardInfoItem from './BoardInfoItem';
import { BoardInfoItemProps } from './BoardInfoItem/BoardInfoItem';
import TrashcanIcon from '../../../assets/svg/trash.svg';
import classNames from 'classnames';
import { isLargeMobile } from '../../../helpers/getWindowWidth';

export const BoardCard = (props: BoardProps): JSX.Element => {
  const [isMobile, setIsMobile] = useState(isLargeMobile());
  useEffect(() => {
    window.addEventListener('resize', () => setIsMobile(isLargeMobile()));
    return () => window.removeEventListener('resize', () => setIsMobile(isLargeMobile()));
  });
  if ('children' in props) {
    const { children, className } = props;
    const cardClassNames = classNames(classes.boardCard, className);
    return (
      <Card className={cardClassNames}>
        <Card.Body className={classes.boardCard__content}>
          <Card.Text as="div" className={classes.boardCard__info}>
            {children}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    const { onRemove, title, metaData, className } = props;
    const cardClassNames = classNames(classes.boardCard, className);
    const renderDescription = metaData.map((item) => (
      <BoardInfoItem key={item.name} name={item.name} value={item.value} />
    ));

    const iconClassNames = classNames(classes.button, classes.deleteIcon);

    return (
      <Card className={cardClassNames}>
        <Card.Body className={classes.boardCard__content}>
          <div className={classes.boardCard__header}>
            <Card.Title className={classes.boardCard__title}>{title}</Card.Title>
            {!isMobile ? (
              <Button className={classes.button} variant="outline-danger" onClick={(e) => onRemove}>
                Remove
              </Button>
            ) : (
              <Button className={iconClassNames} variant="outline-danger" onClick={(e) => onRemove}>
                <img src={TrashcanIcon} alt="trashcan" />
              </Button>
            )}
          </div>
          <Card.Text as="div" className={classes.boardCard__info}>
            {renderDescription}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
};

export type BoardProps =
  | {
      title: string;
      metaData: BoardInfoItemProps[];
      onRemove: (id: string) => void;
      className?: string;
    }
  | { children: ReactNode; className?: string };

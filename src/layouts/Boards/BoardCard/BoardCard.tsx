import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import classes from './BoardCard.module.scss';

export const BoardCard = (props: BoardProps): JSX.Element => {
  const title = props.title;

  return (
    <Card className={classes.boardCard}>
      <Card.Body className={classes.boardCard__content}>
        <div className={classes.boardCard__header}>
          <Card.Title className={classes.boardCard__title}>{title}</Card.Title>
          <Button variant="outline-danger" onClick={() => {}}>
            Delete
          </Button>
        </div>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export type BoardProps = {
  title: string;
};

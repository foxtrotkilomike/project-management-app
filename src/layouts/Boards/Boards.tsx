import { useEffect, useState } from 'react';
import Container from '../../commons/Container';
import { deleteBoardById, getAllBoards } from '../../services/boards/boardsService';
import { BoardsResponse } from '../../services/boards/types';
import plusButton from '../../assets/svg/plus.svg';
import BoardCard from './BoardCard';
import classes from './Boards.module.scss';

export const Boards = (): JSX.Element => {
  const [boards, setBoards] = useState<BoardsResponse[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    getAllBoards().then((result) => {
      if (!('code' in result)) {
        setBoards(result);
      } else {
        console.log('error occured ', result);
      }
    });
  }, []);

  const onRemove = (id: string) => {
    deleteBoardById(id).then((res) => {
      if ('code' in res) {
        console.log("couldn't delete the board");
      } else {
        console.log('board removed successfully');
      }
    });
  };

  const renderBoards = () =>
    boards.map((board) => {
      const { owner, users, _id: id, title } = board;
      const metaData = [
        { name: 'owner', value: owner },
        { name: 'users number', value: users.length },
      ];
      return (
        <BoardCard key={id} title={title} metaData={metaData} onRemove={(id) => onRemove(id)} />
      );
    });

  const showModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <Container centered main growing>
      <div className={classes.boards}>
        <h1 className={classes.boards__title}>Your projects ({boards.length})</h1>
        <div className={classes.boards__content}>
          {renderBoards()}
          <BoardCard className={classes.boards__empty}>
            <button className={classes.boards__add} onClick={showModal}></button>
          </BoardCard>
        </div>
      </div>
    </Container>
  );
};

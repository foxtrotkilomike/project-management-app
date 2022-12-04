import { useContext, useEffect, useState } from 'react';
import Container from '../../commons/Container';
import { createBoard, deleteBoardById, getAllBoards } from '../../services/boards/boardsService';
import { BoardsResponse } from '../../services/boards/types';
import BoardCard from './BoardCard';
import classes from './Boards.module.scss';
import Modal from '../../commons/Modal';
import Form from '../../commons/Form';
import { creationFormData } from '../../config/data';
import { ModalForm } from '../../config/types';
import { useAuthContext } from '../../contexts/auth/authContext';
import Spinner from '../../commons/Spinner';

export const Boards = (): JSX.Element => {
  const [boards, setBoards] = useState<BoardsResponse[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    getAllBoards().then((result) => {
      setIsLoading(false);
      if (!('code' in result)) {
        setBoards(result);
      } else {
        console.log('error occured ', result);
      }
    });
  }, []);

  const removeBoard = (id: string) => {
    deleteBoardById(id).then((res) => {
      if ('code' in res) {
        console.log("couldn't delete the board");
      } else {
        console.log('board removed successfully');
        const newBoards = [...boards].filter((board) => board._id !== id);
        setBoards(newBoards);
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
        <BoardCard key={id} id={id} title={title} metaData={metaData} onRemove={removeBoard} />
      );
    });

  const showModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const createBoardCard = (data: ModalForm) => {
    const newBoard = {
      owner: user.login,
      title: data.title,
      users: [],
    };

    createBoard(newBoard).then((res) => {
      if ('code' in res) {
        console.log('Error occured while creating board. Please try again later');
      } else {
        const newBoards = [...boards, res];
        setBoards(newBoards);
        closeModal();
      }
    });
  };

  return isLoading ? (
    <>
      <Spinner />
      <Container centered main growing>
        {' '}
      </Container>
    </>
  ) : (
    <Container centered main growing>
      <div className={classes.boards}>
        <h1 className={classes.boards__title}>Your projects ({boards.length})</h1>
        <div className={classes.boards__content}>
          {renderBoards()}
          <BoardCard className={classes.boards__empty}>
            <button className={classes.boards__add} onClick={showModal}></button>
          </BoardCard>
        </div>
        <Modal isActive={isModalActive} onHide={closeModal} title={creationFormData.board.title}>
          <Form
            fields={creationFormData.board.fields}
            onSubmit={createBoardCard}
            onCancel={closeModal}
          ></Form>
        </Modal>
      </div>
    </Container>
  );
};

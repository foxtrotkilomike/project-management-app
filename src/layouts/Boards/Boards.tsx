import { useEffect, useState } from 'react';
import Container from '../../commons/Container';
import {
  createBoard,
  deleteBoardById,
  getBoardsByUserId,
} from '../../services/boards/boardsService';
import { BoardFilled, BoardsResponse } from '../../services/boards/types';
import BoardCard from './BoardCard';
import classes from './Boards.module.scss';
import Modal from '../../commons/Modal';
import Form from '../../commons/Form';
import { confirmationModalText, creationFormData, toastMessages } from '../../config/data';
import { useAuthContext } from '../../contexts/auth/authContext';
import Spinner from '../../commons/Spinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FormInputNames } from '../../config/types';
import { routes } from '../../config/routes';
import { useModalState } from '../../hooks/useModalState';
import { getUserById } from '../../services/users/userService';
import ConfirmationModal from '../../commons/ConfirmationModal';

export const Boards = (): JSX.Element => {
  const [boards, setBoards] = useState<BoardFilled[]>([]);
  const [isModalActive, closeModal, showModal] = useModalState(false);
  const [isConfirmModalActive, closeConfirmModal, showConfirmModal] = useModalState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [removedBoardId, setRemovedBoardId] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    getBoardsByUserId(user._id).then((result) => {
      setIsLoading(false);
      if ('code' in result) {
        toast.error(toastMessages.error.unknown);
      } else {
        toast.success(toastMessages.success.boardsLoaded);
        getBoardsOwnerNames(result).then((boards) => setBoards(boards));
      }
    });
  }, []);

  const getBoardsOwnerNames = (boardsResponse: BoardsResponse[]) => {
    return Promise.all(boardsResponse.map(async (board) => setBoardOwnerName(board)));
  };

  const setBoardOwnerName = async (board: BoardsResponse) => {
    const userResponse = await getUserById(board.owner);
    if (!('code' in userResponse)) {
      return { ...board, ownerName: userResponse.name };
    }
    return { ...board, ownerName: 'unknown' };
  };

  const handleRemoveBoardClick = (id: string) => {
    showConfirmModal();
    setRemovedBoardId(id);
  };

  const removeBoard = () => {
    deleteBoardById(removedBoardId).then((res) => {
      if ('code' in res) {
        toast.error(toastMessages.error.unknown);
      } else {
        closeConfirmModal();
        toast.success(toastMessages.success.boardRemoved);
        const newBoards = [...boards].filter((board) => board._id !== removedBoardId);
        setBoards(newBoards);
      }
    });
  };

  const goToBoardPage = (id: string) => {
    navigate(`${routes.BOARD}/${id}`);
  };

  const renderBoards = () =>
    boards.map((board) => {
      const { ownerName, users, _id: id, title } = board;
      const metaData = [
        { name: 'owner', value: ownerName },
        { name: 'users number', value: users.length },
      ];
      return (
        <BoardCard
          key={id}
          id={id}
          title={title}
          metaData={metaData}
          onRemove={handleRemoveBoardClick}
          onClick={goToBoardPage}
        />
      );
    });

  const createBoardCard = (data: FormInputNames) => {
    const newBoard = {
      owner: user._id,
      title: data.title,
      users: [],
    };

    createBoard(newBoard).then((boardResponse) => {
      if ('code' in boardResponse) {
        toast.error(toastMessages.error.unknown);
      } else {
        toast.success(toastMessages.success.boardCreated);
        setBoardOwnerName(boardResponse).then((createdBoard) => {
          const newBoards = [...boards, createdBoard];
          setBoards(newBoards);
          closeModal();
        });
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
        <ConfirmationModal
          title={confirmationModalText.deleteBoard}
          onHide={closeConfirmModal}
          isActive={isConfirmModalActive}
          handleCancelClick={closeConfirmModal}
          handleConfirmationClick={removeBoard}
        />
      </div>
    </Container>
  );
};

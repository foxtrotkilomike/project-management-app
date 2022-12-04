import { useState } from 'react';

export const useModalState = (): [boolean, () => void, () => void] => {
  const [isModalActive, setIsModalActive] = useState(false);

  const closeModal = () => {
    setIsModalActive(false);
  };

  const openModal = () => {
    setIsModalActive(true);
  };

  return [isModalActive, closeModal, openModal];
};

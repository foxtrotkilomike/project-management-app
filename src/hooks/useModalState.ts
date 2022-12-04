import { useState } from 'react';

export const useModalState = (defaultState = false): [boolean, () => void, () => void] => {
  const [isModalActive, setIsModalActive] = useState(defaultState);

  const closeModal = () => {
    setIsModalActive(false);
  };

  const openModal = () => {
    setIsModalActive(true);
  };

  return [isModalActive, closeModal, openModal];
};

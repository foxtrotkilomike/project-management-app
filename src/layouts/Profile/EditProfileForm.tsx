import React from 'react';
import { ApiError, FormInputNames } from '../../config/types';
import { useLoadingContext } from '../../contexts/loading/loadingContext';
import { useNavigate } from 'react-router-dom';
import { getAppData, setAppData } from '../../helpers/handleAppData';
import { deleteUserById, updateUserById } from '../../services/users/userService';
import clearUserData from '../../helpers/clearUserData';

import Form from '../../commons/Form';
import { AppData, creationFormData } from '../../config/data';
import { UserResponse } from '../../services/users/types';
import { routes } from '../../config/routes';
import { useModalState } from '../../hooks/useModalState';
import ConfirmationModal from '../../commons/ConfirmationModal';

const EditProfileForm = (props: EditProfileFormProps): JSX.Element => {
  const { submitButtonText, deleteProfileButtonText, deleteConfirmationMessage } = props;
  const { setLoadingStatus } = useLoadingContext();
  const [isModalActive, closeModal, openModal] = useModalState();
  const navigate = useNavigate();

  const logOutUser = () => {
    closeModal();
    // TODO add Success Notification
    clearUserData();
    navigate(routes.MAIN);
  };

  const setUpdatedUserData = (updatedUserData: UserResponse) => {
    const { name: userName, login: userLogin } = updatedUserData as UserResponse;
    setAppData({ userName, userLogin });
  };

  const updateUserData = async (data: FormInputNames) => {
    const { userName, userLogin, password } = data;
    handleProfileEdit('update', userName, userLogin, password);
  };

  const deleteUser = async () => {
    handleProfileEdit('delete');
  };

  const handleProfileEdit = async (
    actionType: 'update' | 'delete',
    userName = '',
    userLogin = '',
    password = ''
  ) => {
    setLoadingStatus('loading');
    const userId = getAppData(AppData.USER_ID) || '';
    try {
      const updatedUserData =
        actionType === 'update'
          ? await updateUserById(userId, {
              name: userName,
              login: userLogin,
              password,
            })
          : await deleteUserById(userId);

      setLoadingStatus('complete');
      if ('code' in updatedUserData) {
        // TODO add Error Notification
        alert(`Error: ${(updatedUserData as ApiError).message}`);
      } else {
        if (actionType === 'update') {
          // TODO add Notification
          alert('Profile updated successfully');
          setUpdatedUserData(updatedUserData as UserResponse);
        } else {
          // TODO add Notification
          alert('Profile deleted successfully');
          logOutUser();
        }
      }
    } catch (error) {
      // TODO add notification
      alert('Some error occurred, please try again later');
    }
  };

  return (
    <>
      <Form
        fields={creationFormData.profile.fields}
        onSubmit={updateUserData}
        onCancel={openModal}
        buttonsText={{ submit: submitButtonText, cancel: deleteProfileButtonText }}
        fullPage
      />
      <ConfirmationModal
        title={deleteConfirmationMessage}
        onHide={closeModal}
        isActive={isModalActive}
        handleCancelClick={closeModal}
        handleConfirmationClick={deleteUser}
      />
    </>
  );
};

export type EditProfileFormProps = {
  submitButtonText: string;
  deleteProfileButtonText: string;
  deleteConfirmationMessage: string;
};

export default EditProfileForm;

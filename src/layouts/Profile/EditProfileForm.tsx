import React from 'react';
import { ApiError, FormInputNames } from '../../config/types';
import { useLoadingContext } from '../../contexts/loading/loadingContext';

import { AppData, creationFormData } from '../../config/data';
import { getAppData, setAppData } from '../../helpers/handleAppData';
import Form from '../../commons/Form';
import { updateUserById } from '../../services/users/userService';
import { UserResponse } from '../../services/users/types';

const EditProfileForm = (props: EditProfileFormProps): JSX.Element => {
  const { submitButtonText, deleteProfileButtonText } = props;
  const { setLoadingStatus } = useLoadingContext();

  const postUpdatedUserData = async (data: FormInputNames) => {
    setLoadingStatus('loading');
    const { userName, userLogin, password } = data;
    const userId = getAppData(AppData.USER_ID) || '';
    const updatedUserData = await updateUserById(userId, {
      name: userName,
      login: userLogin,
      password,
    });
    if ('code' in updatedUserData) {
      // TODO add Error Notification
      alert(`Error: ${(updatedUserData as ApiError).message}`);
    } else {
      // TODO add Success Notification
      alert('Profile updated successfully');
      const { name: userName, login: userLogin } = updatedUserData as UserResponse;
      setAppData({ userName, userLogin });
    }
    setLoadingStatus('complete');
  };

  const deleteUser = () => {
    // setLoadingStatus('loading');
    // clearUserData();
    // setLoadingStatus('complete');
  };

  return (
    <Form
      fields={creationFormData.profile.fields}
      onSubmit={postUpdatedUserData}
      onCancel={() => console.log('delete user')}
      buttonsText={{ submit: submitButtonText, cancel: deleteProfileButtonText }}
      fullPage
    />
  );
};

export type EditProfileFormProps = {
  submitButtonText: string;
  deleteProfileButtonText: string;
};

export default EditProfileForm;

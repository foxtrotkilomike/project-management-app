import React from 'react';
import { EditProfileFormInput } from '../../config/types';

const EditProfileForm = (props: EditProfileFormProps): JSX.Element => {
  const { inputs, submitButtonText, deleteProfileButtonText } = props;

  return <div>This is edit profile form</div>;
};

export type EditProfileFormProps = {
  inputs: EditProfileFormInput[];
  submitButtonText: string;
  deleteProfileButtonText: string;
};

export default EditProfileForm;

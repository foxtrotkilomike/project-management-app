import React from 'react';
import axios from 'axios';
import axiosInstance, { Endpoints } from './api';
import { LoginFormInputs, SignInForm, SignUpData, SignUpForm } from '../config/types';
import { ErrorOption, FieldPath } from 'react-hook-form';
import { ResponseStatus } from '../config/constants';

const postSignUpData = (data: SignUpData) => {
  const url = `${Endpoints.auth.base}${Endpoints.auth.signUp}`;
  return axiosInstance.post(url, data);
};

const handleSignUpErrors = (
  error: unknown,
  setError: (
    name: FieldPath<LoginFormInputs>,
    error: ErrorOption,
    options?: { shouldFocus: boolean }
  ) => void,
  setSubmissionError: React.Dispatch<React.SetStateAction<string>>,
  formTextData: SignUpForm | SignInForm
) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case ResponseStatus.USER_EXIST:
          setError('login', { message: (formTextData as SignUpForm).submitErrors.userExists });
          break;

        case ResponseStatus.BAD_REQUEST:
          setSubmissionError((formTextData as SignUpForm).submitErrors.badRequest);
          break;

        default:
          setSubmissionError((formTextData as SignUpForm).submitErrors.unknownError);
          break;
      }
    } else if (error.request) {
      setSubmissionError((formTextData as SignUpForm).submitErrors.serverNotResponding);
    } else {
      setSubmissionError((formTextData as SignUpForm).submitErrors.unknownError);
    }
  }
};

export { postSignUpData, handleSignUpErrors };

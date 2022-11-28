import React from 'react';
import axios from 'axios';
import axiosInstance, { Endpoints } from './api';
import {
  LoginFormInputs,
  LoginFormType,
  SignInData,
  SignInForm,
  SignUpData,
  SignUpForm,
} from '../config/types';
import { ErrorOption, FieldPath } from 'react-hook-form';
import { ResponseStatus } from '../config/constants';

const postAuthData = (data: SignUpData | SignInData, type: LoginFormType) => {
  const authEndpoint = type === 'signUp' ? Endpoints.auth.signUp : Endpoints.auth.signIn;
  const url = `${Endpoints.auth.base}${authEndpoint}`;
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
  const { userExists, badRequest, unknownError, serverNotResponding } = (formTextData as SignUpForm)
    .submitErrors;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case ResponseStatus.USER_ALREADY_EXIST:
          setError('login', { message: userExists });
          break;

        case ResponseStatus.BAD_REQUEST:
          setSubmissionError(badRequest);
          break;

        default:
          setSubmissionError(unknownError);
          break;
      }
    } else if (error.request) {
      setSubmissionError(serverNotResponding);
    } else {
      setSubmissionError(unknownError);
    }
  }
};

export { postAuthData, handleSignUpErrors };

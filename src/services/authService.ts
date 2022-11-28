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

const handleAuthErrors = (
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
  const { notAuthorized } = (formTextData as SignInForm).submitErrors;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log(error.response.data);

      switch (error.response.status) {
        case ResponseStatus.USER_ALREADY_EXIST:
          setError('login', { message: userExists });
          break;

        case ResponseStatus.NOT_AUTHORIZED:
          setSubmissionError(notAuthorized);
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

const setAppData = (data: Record<string, string>) => {
  for (const [key, value] of Object.entries(data)) {
    window.localStorage.setItem(key, value);
  }
};
const getAppData = (key: string) => window.localStorage.getItem(key);

export { postAuthData, handleAuthErrors, setAppData, getAppData };

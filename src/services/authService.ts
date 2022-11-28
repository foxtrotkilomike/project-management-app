import React from 'react';
import axios from 'axios';
import { ErrorOption, FieldPath } from 'react-hook-form';

import axiosInstance, { Endpoints } from './api';
import { LoginFormInputs, LoginFormType, SignInData, SignUpData } from '../config/types';
import { ResponseStatus } from '../config/constants';
import { loginFormData } from '../config/data';

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
  setSubmissionError: React.Dispatch<React.SetStateAction<string>>
) => {
  const { userExists } = loginFormData.signUp.submissionErrors;
  const { notAuthorized } = loginFormData.signIn.submissionErrors;
  const { badRequest, unknownError, serverNotResponding } = loginFormData.submissionErrors;

  if (axios.isAxiosError(error)) {
    if (error.response) {
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

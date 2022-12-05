import React from 'react';
import axios from 'axios';
import { ErrorOption, FieldPath } from 'react-hook-form';

import { authInstance, Endpoints } from './api';
import { LoginFormInputs, LoginFormType, SignInData, SignUpData } from '../config/types';
import { MILLISECONDS_IN_SECOND, ResponseStatus } from '../config/constants';
import { AppData, loginFormData } from '../config/data';
import { getAppData } from '../helpers/handleAppData';

const postAuthData = (data: SignUpData | SignInData, type: LoginFormType) => {
  const { base: baseUrl, signUp, signIn } = Endpoints.auth;
  const authEndpoint = type === 'signUp' ? signUp : signIn;
  const url = `${baseUrl}${authEndpoint}`;
  return authInstance.post(url, data);
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

const checkUserCredentials = () => {
  const tokenExpirationValue = getAppData(AppData.EXPIRATION_TIME);

  if (tokenExpirationValue) {
    const tokenExpirationTime = parseInt(tokenExpirationValue);
    const isExpiredToken = Date.now() > tokenExpirationTime * MILLISECONDS_IN_SECOND;
    const hasUserData = getAppData(AppData.USER_ID);
    const hasToken = getAppData(AppData.TOKEN);

    return Boolean(!isExpiredToken && hasUserData && hasToken);
  }

  return false;
};

export { postAuthData, handleAuthErrors, checkUserCredentials };

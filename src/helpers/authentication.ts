import { JWTData, LoginFormInputs } from '../config/types';
import { ErrorOption, FieldPath } from 'react-hook-form';
import jwtDecode from 'jwt-decode';
import { loginFormData } from '../config/data';

const checkPasswordMatch = (
  data: LoginFormInputs,
  setError: (
    name: FieldPath<LoginFormInputs>,
    error: ErrorOption,
    options?: { shouldFocus: boolean }
  ) => void
) => {
  const isPasswordMatch = data.password === data.repeatedPassword;

  if (!isPasswordMatch) {
    setError('repeatedPassword', {
      message: loginFormData.signUp.submissionErrors.passwordMismatch,
    });
  }
};

const retrieveSignUpData = (data: LoginFormInputs) => {
  const { userName: name, login, password } = data;
  return { name, login, password };
};

const retrieveSignInData = (data: LoginFormInputs) => {
  const { login, password } = data;
  return { login, password };
};

const decodeToken = (token: string) => {
  const { exp, iat, id, login } = jwtDecode(token) as JWTData;
  return { expirationTime: exp, issuedAt: iat, userId: id, login };
};

export { checkPasswordMatch, retrieveSignUpData, retrieveSignInData, decodeToken };

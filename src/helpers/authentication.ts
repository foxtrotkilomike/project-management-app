import { JWTData, LoginFormInputs, SignInForm, SignUpForm } from '../config/types';
import { ErrorOption, FieldPath } from 'react-hook-form';
import jwtDecode from 'jwt-decode';

const checkPasswordMatch = (
  data: LoginFormInputs,
  setError: (
    name: FieldPath<LoginFormInputs>,
    error: ErrorOption,
    options?: { shouldFocus: boolean }
  ) => void,
  formTextData: SignUpForm | SignInForm
) => {
  const isPasswordMatch = data.password === data.repeatedPassword;

  if (!isPasswordMatch) {
    setError('repeatedPassword', {
      message: (formTextData as SignUpForm).submitErrors.passwordMismatch,
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

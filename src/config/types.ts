import { LoginPromptData } from '../commons/LoginPrompt';
import { RegisterOptions } from 'react-hook-form';

type LoginFormInputs = {
  userName: string;
  login: string;
  password: string;
  repeatedPassword: string;
};

type FormInput = {
  type: string;
  name: keyof LoginFormInputs;
  placeholder?: string;
  autoComplete?: string;
  registerOptions: RegisterOptions;
};

interface LoginFormControls {
  inputs: FormInput[];
  submitButtonText: string;
}

interface ApiErrors {
  serverNotResponding: string;
  badRequest: string;
  unknownError: string;
}

interface SignUpForm extends LoginFormControls {
  submissionErrors: {
    userExists: string;
    passwordMismatch: string;
  };
}

interface SignInForm extends Omit<LoginFormControls, 'userName' | 'repeatedPassword'> {
  submissionErrors: {
    notAuthorized: string;
  };
}

type FormValidationErrors = {
  userNameRequired: string;
  loginRequired: string;
  passwordRequired: string;
  passwordLength: string;
};

type LoginForm = {
  signUp: SignUpForm;
  signIn: SignInForm;
  submissionErrors: ApiErrors;
};

type LoginFormType = 'signUp' | 'signIn';

type LoginPrompt = {
  signUp: LoginPromptData;
  signIn: LoginPromptData;
};

type SignUpData = {
  name: string;
  login: string;
  password: string;
};

type SignInData = {
  login: string;
  password: string;
};

type JWTData = {
  exp: string;
  iat: string;
  id: string;
  login: string;
};

type ServerErrorResponse = {
  statusCode: string;
  message: string;
};

type ApiError = {
  code: number;
  message: string;
};

export interface IFormField extends Omit<FormInput, 'name'> {
  name: 'title' | 'description';
  rows?: number;
}
type CreationFormData = {
  [index in FormType]: { type: FormType; fields: IFormField[]; title: string };
};
type FormType = 'column' | 'task' | 'board';

type ModalForm = {
  title: string;
  description?: string;
};

export type {
  FormValidationErrors,
  JWTData,
  LoginForm,
  LoginFormInputs,
  LoginFormType,
  LoginPrompt,
  SignUpForm,
  SignInForm,
  SignUpData,
  SignInData,
  ServerErrorResponse,
  ApiError,
  FormInput,
  CreationFormData,
  ModalForm,
  FormType,
};

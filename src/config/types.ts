import { LoginPromptData } from '../commons/LoginPrompt';

type LoginFormInputs = {
  id: number;
  userName: string;
  password: string;
};

type SignUpForm = {
  userName: string;
  login: string;
  password: string;
  repeatedPassword: string;
  submitButton: string;
  errors: {
    userExists: string;
    passwordMismatch: string;
  };
};

type SignInForm = {
  login: string;
  password: string;
  submitButton: string;
  errors: {
    userDoesNotExists: string;
    incorrectPassword: string;
  };
};

type FormValidationErrors = {
  userNameRequired: string;
  passwordRequired: string;
  passwordLength: string;
};

type LoginForm = {
  signUp: SignUpForm;
  signIn: SignInForm;
  validationErrors: FormValidationErrors;
};

type LoginFormType = 'signUp' | 'signIn';

type LoginPrompt = {
  signUp: LoginPromptData;
  signIn: LoginPromptData;
};

export type {
  LoginFormInputs,
  SignUpForm,
  SignInForm,
  FormValidationErrors,
  LoginForm,
  LoginFormType,
  LoginPrompt,
};

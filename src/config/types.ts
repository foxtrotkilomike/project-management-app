import { LoginPromptData } from '../commons/LoginPrompt';

interface LoginFormInputs {
  userName: string;
  login: string;
  password: string;
  repeatedPassword: string;
}

interface SignUpForm extends LoginFormInputs {
  submitButton: string;
  errors: {
    userExists: string;
    passwordMismatch: string;
  };
}

interface SignInForm extends Omit<LoginFormInputs, 'userName' | 'repeatedPassword'> {
  submitButton: string;
  errors: {
    userDoesNotExists: string;
    incorrectPassword: string;
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

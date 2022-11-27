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

interface SignUpForm extends LoginFormControls {
  submitErrors: {
    userExists: string;
    passwordMismatch: string;
  };
}

interface SignInForm extends Omit<LoginFormControls, 'userName' | 'repeatedPassword'> {
  submitErrors: {
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

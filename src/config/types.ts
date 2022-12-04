import { LoginPromptData } from '../commons/LoginPrompt';
import { RegisterOptions } from 'react-hook-form';

type LoginFormInputs = {
  userName: string;
  login: string;
  password: string;
  repeatedPassword: string;
};

type EditProfileFormInputs = Omit<LoginFormInputs, 'repeatedPassword'>;

interface FormInput {
  type: string;
  name: keyof LoginFormInputs;
  placeholder?: string;
  autoComplete?: string;
  registerOptions: RegisterOptions;
}

interface EditProfileFormInput extends FormInput {
  name: keyof EditProfileFormInputs;
}

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

type FormInputNames = {
  title: string;
  description: string;
  userName: string;
  userLogin: string;
  password: string;
};

export interface IFormField extends Omit<FormInput, 'name'> {
  name: keyof FormInputNames;
  rows?: number;
}

type CreationFormData = {
  [index in FormType]: { type: FormType; fields: IFormField[]; title: string };
};

type FormType = 'column' | 'task' | 'board' | 'profile';

type ModalForm = {
  title: string;
  description?: string;
};

type LoadingStatus = 'loading' | 'complete';

export type {
  FormValidationErrors,
  FormInput,
  FormInputNames,
  EditProfileFormInput,
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
  CreationFormData,
  ModalForm,
  FormType,
  LoadingStatus,
};

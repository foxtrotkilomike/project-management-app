import { SelectProps } from '../commons/Select';
import GlobeIcon from '../assets/svg/globe2.svg';
import { ApiError, LoginForm, LoginPrompt } from './types';
import { MIN_PASSWORD_LENGTH, ResponseStatus } from './constants';

const buttonsText = {
  signUp: 'Sign up',
  signIn: 'Sign in',
  createBoard: 'Create board',
  editProfile: 'Edit profile',
  mainPage: 'Main page',
  signOut: 'Sign out',
};

const footerData = {
  year: '2022',
  developers: [
    {
      name: 'Stanislav Kravchuk',
      githubLink: 'https://github.com/kravchuk-st',
    },
    {
      name: 'Philipp Khromov',
      githubLink: 'https://github.com/foxtrotkilomike',
    },
    {
      name: 'Alina Khasanova',
      githubLink: 'https://github.com/malinka775',
    },
  ],
};

const loginFormData: LoginForm = {
  signUp: {
    inputs: [
      {
        type: 'text',
        name: 'userName',
        placeholder: 'Name',
        registerOptions: {
          required: { value: true, message: 'Name is a required field' },
        },
      },
      {
        type: 'text',
        name: 'login',
        placeholder: 'Login',
        autoComplete: 'username',
        registerOptions: {
          required: { value: true, message: 'Login is a required field' },
        },
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        autoComplete: 'new-password',
        registerOptions: {
          required: { value: true, message: 'Password is a required field' },
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: 'Password must be at least 8 characters long',
          },
        },
      },
      {
        type: 'password',
        name: 'repeatedPassword',
        placeholder: 'Repeat password',
        autoComplete: 'new-password',
        registerOptions: {
          required: { value: true, message: 'Password is a required field' },
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: 'Password must be at least 8 characters long',
          },
        },
      },
    ],
    submitButtonText: 'Sign up',
    submissionErrors: {
      userExists: 'User with such login already exists',
      passwordMismatch: 'Passwords do not match',
    },
  },
  signIn: {
    inputs: [
      {
        type: 'text',
        name: 'login',
        placeholder: 'Login',
        autoComplete: 'username',
        registerOptions: {
          required: { value: true, message: 'Login is a required field' },
        },
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        autoComplete: 'current-password',
        registerOptions: {
          required: { value: true, message: 'Password is a required field' },
        },
      },
    ],
    submitButtonText: 'Sign in',
    submissionErrors: {
      notAuthorized: 'Login or password is incorrect',
    },
  },
  submissionErrors: {
    badRequest: 'An error occurred, check your data for correctness',
    serverNotResponding: 'Server is not responding, please try again later',
    unknownError: 'Sorry, something went wrong, please try again later',
  },
};

const loginHeading = {
  signUp: 'Sign Up',
  signIn: 'Sign In',
};

const loginPromptData: LoginPrompt = {
  signUp: {
    prompt: 'Already have an account?',
    linkText: 'Sign in',
  },
  signIn: {
    prompt: "Don't have an account?",
    linkText: 'Sign up',
  },
};

const selectData: SelectProps[] = [
  {
    labelType: 'icon',
    ariaLabel: 'Language',
    options: ['EN', 'RU'],
    activeOptionIndex: 0,
    icon: GlobeIcon,
  },
];

const apiErrors: Record<string, ApiError> = {
  serverIsNotResponding: {
    code: ResponseStatus.UNKNOWN_ERROR,
    message: 'Server is not responding',
  },
  fallbackError: {
    code: ResponseStatus.UNKNOWN_ERROR,
    message: 'Unknown error',
  },
};

export {
  buttonsText,
  footerData,
  loginFormData,
  loginHeading,
  loginPromptData,
  selectData,
  apiErrors,
};

import { SelectProps } from '../commons/Select';
import GlobeIcon from '../assets/svg/globe2.svg';
import { LoginForm, LoginPrompt } from './types';
import { MIN_PASSWORD_LENGTH } from './constants';

const buttonsText = {
  signUp: 'sign up',
  signIn: 'sign in',
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
        autoComplete: 'username',
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
    submitErrors: {
      userExists: 'User with such login already exists',
      passwordMismatch: 'Passwords do not match',
      badRequest: 'An error occurred, check your data for correctness',
      serverNotResponding: 'Server is not responding, please try again later',
      unknownError: 'Sorry, something went wrong, please try again later',
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
    submitErrors: {
      notAuthorized: 'Login or password is incorrect',
      badRequest: 'An error occurred, check your data for correctness',
      serverNotResponding: 'Server is not responding, please try again later',
      unknownError: 'Sorry, something went wrong, please try again later',
    },
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

export { buttonsText, footerData, loginFormData, loginHeading, loginPromptData, selectData };

import { SelectProps } from '../commons/Select';
import GlobeIcon from '../assets/svg/globe2.svg';
import { LoginForm, LoginFormInputs, LoginPrompt } from './types';
import { RegisterOptions } from 'react-hook-form';

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
    userName: 'Name',
    login: 'Login',
    password: 'Password',
    repeatedPassword: 'Repeat password',
    submitButton: 'Sign up',
    errors: {
      userExists: 'User with such login already exists',
      passwordMismatch: "Passwords don't not match",
    },
  },
  signIn: {
    login: 'Login',
    password: 'Password',
    submitButton: 'Log in',
    errors: {
      userDoesNotExists: 'User with such login does not exist',
      incorrectPassword: 'Password is incorrect',
    },
  },
  validationErrors: {
    userNameRequired: 'Name is a required field',
    loginRequired: 'Login is a required field',
    passwordRequired: 'Password is a required field',
    passwordLength: 'Password must be at least 8 characters long',
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

const { validationErrors } = loginFormData;

const signUpFormResisterOptions: Record<keyof LoginFormInputs, RegisterOptions> = {
  userName: {
    required: { value: true, message: validationErrors.userNameRequired },
  },
  login: {
    required: { value: true, message: validationErrors.loginRequired },
  },
  password: {
    required: { value: true, message: validationErrors.passwordRequired },
    minLength: { value: 8, message: validationErrors.passwordLength },
  },
  repeatedPassword: {
    required: { value: true, message: validationErrors.passwordRequired },
    minLength: { value: 8, message: validationErrors.passwordLength },
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

export {
  buttonsText,
  footerData,
  loginFormData,
  loginHeading,
  loginPromptData,
  selectData,
  signUpFormResisterOptions,
};

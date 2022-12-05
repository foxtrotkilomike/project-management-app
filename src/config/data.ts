import { SelectProps } from '../commons/Select';
import GlobeIcon from '../assets/svg/globe2.svg';
import { ApiError, CreationFormData, LoginForm, LoginPrompt } from './types';
import { MIN_PASSWORD_LENGTH, ResponseStatus } from './constants';
import { ProfilePageData } from '../layouts/Profile/Profile';
import reactImg from '../assets/svg/technologies/react.svg';
import tsImg from '../assets/svg/technologies/ts.svg';
import routerImg from '../assets/svg/technologies/router.svg';
import viteImg from '../assets/svg/technologies/vite.svg';
import bootstrapImg from '../assets/svg/technologies/bootstrap.svg';
import formImg from '../assets/svg/technologies/form.svg';
import dndImg from '../assets/svg/technologies/dnd.svg';
import stasImg from '../assets/team/stas.jpg';
import philImg from '../assets/team/phil.jpg';
import alinaImg from '../assets/team/alina.jpg';

const buttonsText = {
  signUp: 'Sign up',
  signIn: 'Sign in',
  createBoard: 'Create board',
  editProfile: 'Edit profile',
  mainPage: 'Main page',
  signOut: 'Sign out',
  cancel: 'cancel',
  submit: 'submit',
};

const confirmationModalButtonsText = {
  cancel: 'cancel',
  submit: 'confirm',
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
        autoFocus: true,
        autoComplete: 'given-name',
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
        autoFocus: true,
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
    serverNotResponding:
      'Server is not responding, please try again in a few moments, it should be up and running',
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

const selectData: Record<string, SelectProps> = {
  language: {
    labelType: 'icon',
    ariaLabel: 'Language',
    options: ['EN', 'RU'],
    activeOptionIndex: 0,
    icon: GlobeIcon,
  },
};

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

const creationFormData: CreationFormData = {
  column: {
    title: 'New column',
    fields: [
      {
        type: 'text',
        name: 'title',
        placeholder: 'Title',
        autoFocus: true,
        registerOptions: {
          required: { value: true, message: 'Title is a required field' },
        },
      },
    ],
  },
  task: {
    title: 'New task',
    fields: [
      {
        type: 'text',
        name: 'title',
        placeholder: 'Title',
        registerOptions: {
          required: { value: true, message: 'Title is a required field' },
        },
      },
      {
        type: 'textarea',
        name: 'description',
        rows: 6,
        placeholder: 'Description',
        registerOptions: {
          required: { value: true, message: 'Description is a required field' },
        },
      },
    ],
  },
  board: {
    title: 'New board',
    fields: [
      {
        type: 'text',
        name: 'title',
        placeholder: 'Title',
        autoFocus: true,
        registerOptions: {
          required: { value: true, message: 'Title is a required field' },
        },
      },
    ],
  },
  profile: {
    title: '',
    fields: [
      {
        type: 'text',
        name: 'userName',
        placeholder: 'Name',
        autoFocus: true,
        autoComplete: 'given-name',
        registerOptions: {
          required: { value: true, message: 'Name is a required field' },
        },
      },
      {
        type: 'text',
        name: 'userLogin',
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
    ],
  },
};

const profilePageConfig: ProfilePageData = {
  heading: 'Edit profile',
  form: {
    submitButtonText: 'Save',
    deleteProfileButtonText: 'Delete profile',
  },
};

enum AppData {
  USER_ID = 'userId',
  USER_LOGIN = 'userLogin',
  USER_NAME = 'userName',
  TOKEN = 'token',
  EXPIRATION_TIME = 'expirationTime',
}

const toastMessages = {
  success: {
    login: 'Logged in',
    logout: 'Logged out',
    profileUpdate: 'Profile updated',
    profileDelete: 'Profile deleted',
    boardLoaded: 'Board loaded',
    boardRemoved: 'Board removed',
    boardCreated: 'Board created',
    boardsLoaded: 'Boards loaded',
    columnCreated: 'Column created',
    columnReordered: 'Columns reordered',
    columnRemoved: 'Column removed',
    taskCreated: 'Task created',
    taskRemoved: 'Task removed',
    tasksReordered: 'Tasks reordered',
  },
  error: {
    profileUpdate: 'Login already exists',
    unknown: 'Some error occurred, please try again later',
  },
};

const confirmationModalText = {
  signOut: 'Confirm your sign out',
  deleteProfile: 'Do you really want to delete your profile?',
  deleteBoard: 'Delete the board?',
  deleteColumn: 'Delete the column?',
  deleteTask: 'Delete the task?',
};

const technologiesList = [
  {
    id: 0,
    title: 'React',
    imgSrc: reactImg,
    link: 'https://beta.reactjs.org/',
  },
  {
    id: 1,
    title: 'TypeScript',
    imgSrc: tsImg,
    link: 'https://www.typescriptlang.org/',
  },
  {
    id: 2,
    title: 'React Router',
    imgSrc: routerImg,
    link: 'https://reactrouter.com/',
  },
  {
    id: 3,
    title: 'Vite',
    imgSrc: viteImg,
    link: 'https://vitejs.dev/',
  },
  {
    id: 4,
    title: 'React Bootstrap',
    imgSrc: bootstrapImg,
    link: 'https://react-bootstrap.github.io/',
  },
  {
    id: 5,
    title: 'React Hook Form',
    imgSrc: formImg,
    link: 'https://react-hook-form.com/',
  },
  {
    id: 6,
    title: 'React Beautiful DnD',
    imgSrc: dndImg,
    link: 'https://github.com/atlassian/react-beautiful-dnd',
  },
];

const developersList = [
  {
    id: 0,
    name: 'Stanislav Kravchuk',
    imgSrc: stasImg,
    descr:
      'Configured project, implemented forms, created adaptive header & burger menu, welcome page, loading spinner',
    link: 'https://github.com/kravchuk-st',
  },
  {
    id: 1,
    name: 'Philipp Khromov',
    imgSrc: philImg,
    descr:
      'Implemented API services, routing, sign-in & sign-up, edit profile logic, managed development process',
    link: 'https://github.com/foxtrotkilomike',
  },
  {
    id: 2,
    name: 'Alina Khasanova',
    imgSrc: alinaImg,
    descr:
      'Designed and implemented boards page, board page functionality (drag & drop), custom modal windows',
    link: 'https://github.com/malinka775',
  },
];

export {
  buttonsText,
  confirmationModalButtonsText,
  footerData,
  loginFormData,
  loginHeading,
  loginPromptData,
  selectData,
  apiErrors,
  creationFormData,
  profilePageConfig,
  AppData,
  toastMessages,
  confirmationModalText,
  technologiesList,
  developersList,
};

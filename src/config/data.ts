import { Props as SelectProps } from '../commons/Select';

const buttonsText = {
  signUp: 'sign up',
  signIn: 'sign in',
};

const selectData: SelectProps[] = [
  {
    ariaLabel: 'language',
    options: ['EN', 'RU'],
  },
];

export { buttonsText, selectData };

import { SelectProps } from '../commons/Select';

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

export { buttonsText, selectData, footerData };

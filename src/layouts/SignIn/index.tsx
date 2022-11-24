import classes from './SignIn.module.scss';

const SignIn = ({}: Props): JSX.Element => {
  return (
    <div>
      This is Sign In page
      {/*
        Here will be the LoginForm component of variant 'signIn'
        <LoginForm variant="signIn">
      */}
    </div>
  );
};

type Props = Record<string, string>;

export default SignIn;

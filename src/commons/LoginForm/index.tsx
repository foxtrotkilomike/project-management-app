import classes from './LoginForm.module.scss';
import { LoginFormInputs, LoginFormType, SignUpForm } from '../../config/types';

import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { loginFormData } from '../../config/data';

const LoginForm = ({ type }: LoginFormProps): JSX.Element => {
  const formTextData = loginFormData[type];
  //TODO: add signUp function
  const signUp = () => {};

  //TODO: add signIn function
  const signIn = () => {};

  const onSubmit = type === 'signUp' ? signUp : signIn;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormInputs>();

  const renderSignUpForm = () => (
    <>
      <Form.Control
        type="text"
        placeholder={(formTextData as SignUpForm).userName}
        aria-label={(formTextData as SignUpForm).userName}
        className={classes.formControl}
      />
      <Form.Control
        type="text"
        placeholder={formTextData.login}
        aria-label={formTextData.login}
        className={classes.formControl}
      />
      <Form.Control
        type="password"
        placeholder={formTextData.password}
        aria-label={formTextData.password}
        className={classes.formControl}
      />
      <Form.Control
        type="password"
        placeholder={(formTextData as SignUpForm).repeatedPassword}
        aria-label={(formTextData as SignUpForm).repeatedPassword}
        className={classes.formControl}
      />
    </>
  );

  const renderSignInForm = () => (
    <>
      <Form.Control
        type="text"
        placeholder={formTextData.login}
        aria-label={formTextData.login}
        className={classes.formControl}
      />
      <Form.Control
        type="password"
        placeholder={formTextData.password}
        aria-label={formTextData.password}
        className={classes.formControl}
      />
    </>
  );

  return (
    <Form onSubmit={onSubmit} className={classes.loginForm}>
      {type === 'signUp' ? renderSignUpForm() : renderSignInForm()}
      <Button variant="primary" type="submit" className={classes.submitButton}>
        {formTextData.submitButton}
      </Button>
    </Form>
  );
};

type LoginFormProps = {
  type: LoginFormType;
};

export default LoginForm;

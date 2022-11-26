import classes from './LoginForm.module.scss';
import { LoginFormInputs, LoginFormType, SignUpForm } from '../../config/types';

import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { loginFormData, signUpFormResisterOptions } from '../../config/data';

export const LoginForm = ({ type }: LoginFormProps): JSX.Element => {
  const formTextData = loginFormData[type];
  //TODO: add signUp function
  const signUp = (data: LoginFormInputs) => {
    console.log(data);
  };

  //TODO: add signIn function
  const signIn = (data: LoginFormInputs) => {};

  const onSubmit = type === 'signUp' ? signUp : signIn;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormInputs>();

  const renderSignUpForm = () => {
    const { userName, login, password, repeatedPassword } = formTextData as SignUpForm;

    return (
      <>
        <Form.Control
          type="text"
          placeholder={userName}
          aria-label={userName}
          className={classes.formControl}
          isInvalid={!!errors.userName}
          {...register('userName', signUpFormResisterOptions.userName)}
        />
        <Form.Control.Feedback type="invalid">{errors.userName?.message}</Form.Control.Feedback>
        <Form.Control
          type="text"
          placeholder={login}
          aria-label={login}
          autoComplete="username"
          className={classes.formControl}
          isInvalid={!!errors.login}
          {...register('login', signUpFormResisterOptions.login)}
        />
        <Form.Control.Feedback type="invalid">{errors.login?.message}</Form.Control.Feedback>
        <Form.Control
          type="password"
          placeholder={password}
          aria-label={password}
          autoComplete="new-password"
          className={classes.formControl}
          isInvalid={!!errors.password}
          {...register('password', signUpFormResisterOptions.password)}
        />
        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        <Form.Control
          type="password"
          placeholder={repeatedPassword}
          aria-label={repeatedPassword}
          autoComplete="new-password"
          className={classes.formControl}
          isInvalid={!!errors.repeatedPassword}
          {...register('repeatedPassword', signUpFormResisterOptions.repeatedPassword)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.repeatedPassword?.message}
        </Form.Control.Feedback>
      </>
    );
  };

  const renderSignInForm = () => {
    const { login, password } = formTextData;

    return (
      <>
        <Form.Control
          type="text"
          placeholder={login}
          aria-label={login}
          className={classes.formControl}
        />
        <Form.Control
          type="password"
          placeholder={password}
          aria-label={password}
          className={classes.formControl}
        />
      </>
    );
  };

  return (
    <Form onSubmit={handleSubmit((data) => onSubmit(data))} className={classes.loginForm}>
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

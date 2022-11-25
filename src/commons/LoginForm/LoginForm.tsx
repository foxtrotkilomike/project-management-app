import classes from './LoginForm.module.scss';
import { LoginFormInputs, LoginFormType, SignUpForm } from '../../config/types';

import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { loginFormData } from '../../config/data';

export const LoginForm = ({ type }: LoginFormProps): JSX.Element => {
  const formTextData = loginFormData[type];
  const onSubmit = type === 'signUp' ? () => console.log('signUp') : () => console.log('signIn');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormInputs>();

  return (
    <Form onSubmit={onSubmit} className={classes.loginForm}>
      {type === 'signUp' && (
        <Form.Control
          type="text"
          placeholder={(formTextData as SignUpForm).userName}
          aria-label={(formTextData as SignUpForm).userName}
          className={classes.formControl}
        />
      )}
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
      {type === 'signUp' && (
        <Form.Control
          type="password"
          placeholder={(formTextData as SignUpForm).passwordRepeat}
          aria-label={(formTextData as SignUpForm).passwordRepeat}
          className={classes.formControl}
        />
      )}
      <Button variant="primary" type="submit" className={classes.submitButton}>
        {formTextData.submitButton}
      </Button>
    </Form>
  );
};

type LoginFormProps = {
  type: LoginFormType;
};

import classes from './LoginForm.module.scss';
import { LoginFormInputs, LoginFormType } from '../../config/types';

import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { loginFormData } from '../../config/data';
import Container from '../Container';
import { checkPasswordMatch, retrieveSignUpData } from '../../helpers/authentication';
import { handleSignUpErrors, postSignUpData } from '../../services/authService';
import { routes } from '../../config/routes';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ type }: LoginFormProps): JSX.Element => {
  const formTextData = loginFormData[type];
  const navigate = useNavigate();

  const signUp = async (data: LoginFormInputs) => {
    checkPasswordMatch(data, setError, formTextData);
    const signUpData = retrieveSignUpData(data);

    const response = await postSignUpData(signUpData).catch(handleSignUpErrors);
    console.log('response ', response);
    if (response) navigate(routes.BOARDS);
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

  const renderFormInputs = () => {
    return formTextData.inputs.map((formInput) => {
      const { type, name, placeholder, registerOptions, autoComplete } = formInput;

      return (
        <Container minHeight key={name}>
          <Form.Control
            type={type}
            placeholder={placeholder}
            aria-label={placeholder}
            autoComplete={autoComplete}
            className={classes.formControl}
            isInvalid={!!errors[name]}
            {...register(name, registerOptions)}
          />
          <Form.Control.Feedback type="invalid">{errors[name]?.message}</Form.Control.Feedback>
        </Container>
      );
    });
  };

  return (
    <Form onSubmit={handleSubmit((data) => onSubmit(data))} className={classes.loginForm}>
      {renderFormInputs()}
      <Button variant="primary" type="submit" className={classes.submitButton}>
        {formTextData.submitButtonText}
      </Button>
    </Form>
  );
};

type LoginFormProps = {
  type: LoginFormType;
};

import classes from './LoginForm.module.scss';
import { LoginFormInputs, LoginFormType } from '../../config/types';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Container from '../Container';
import ErrorMessage from '../ErrorMessage';
import {
  checkPasswordMatch,
  decodeToken,
  retrieveSignInData,
  retrieveSignUpData,
} from '../../helpers/authentication';
import { handleAuthErrors, postAuthData, setAppData } from '../../services/authService';
import { loginFormData } from '../../config/data';
import { routes } from '../../config/routes';

export const LoginForm = ({ type }: LoginFormProps): JSX.Element => {
  const formTextData = loginFormData[type];
  const [submissionError, setSubmissionError] = useState('');
  const navigate = useNavigate();

  const signUp = async (data: LoginFormInputs) => {
    setSubmissionError('');
    // TODO add spinner for data loading process
    checkPasswordMatch(data, setError, formTextData);
    const signUpData = retrieveSignUpData(data);

    const response = await postAuthData(signUpData, 'signUp').catch((error) =>
      handleAuthErrors(error, setError, setSubmissionError, formTextData)
    );
    if (response) signIn(data);
  };

  const signIn = async (data: LoginFormInputs) => {
    setSubmissionError('');
    // TODO add spinner for data loading process
    const signInData = retrieveSignInData(data);

    const response = await postAuthData(signInData, 'signIn').catch((error) =>
      handleAuthErrors(error, setError, setSubmissionError, formTextData)
    );

    if (response) {
      if (!response.data.token) setSubmissionError('Invalid server response');

      const { userId, login, expirationTime } = decodeToken(response.data.token);
      setAppData({ token: response.data.token, userId, login, expirationTime });
      navigate(routes.BOARDS);
    }
  };

  const onSubmit = type === 'signUp' ? signUp : signIn;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
      {submissionError && <ErrorMessage message={submissionError} />}
      <Button variant="primary" type="submit" className={classes.submitButton}>
        {formTextData.submitButtonText}
      </Button>
    </Form>
  );
};

type LoginFormProps = {
  type: LoginFormType;
};

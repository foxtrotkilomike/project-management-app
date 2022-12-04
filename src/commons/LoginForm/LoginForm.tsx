import classes from './LoginForm.module.scss';
import { LoginFormInputs, LoginFormType } from '../../config/types';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoadingContext } from '../../contexts/loading/loadingContext';
import { AxiosResponse } from 'axios';
import { Button, Form } from 'react-bootstrap';
import Container from '../Container';
import ErrorMessage from '../ErrorMessage';
import {
  checkPasswordMatch,
  retrieveSignInData,
  retrieveSignUpData,
} from '../../helpers/authentication';
import { checkUserCredentials, handleAuthErrors, postAuthData } from '../../services/authService';
import { loginFormData } from '../../config/data';
import { routes } from '../../config/routes';
import { setReceivedAppData } from '../../helpers/handleAppData';

export const LoginForm = ({ type }: LoginFormProps): JSX.Element => {
  const formTextData = loginFormData[type];
  const [submissionError, setSubmissionError] = useState('');
  const navigate = useNavigate();
  const { setLoadingStatus } = useLoadingContext();
  const isAuthenticatedUser = checkUserCredentials();

  const signUp = async (data: LoginFormInputs) => {
    setLoadingStatus('loading');
    checkPasswordMatch(data, setError);
    await handleAuthorization('signUp', data);
  };

  const signIn = async (data: LoginFormInputs) => {
    setLoadingStatus('loading');
    await handleAuthorization('signIn', data);
  };

  const handleAuthorization = async (formType: LoginFormType, data: LoginFormInputs) => {
    setSubmissionError('');
    const formData = formType === 'signUp' ? retrieveSignUpData(data) : retrieveSignInData(data);
    await postAuthData(formData, formType)
      .then((response) => handleResponse(response, formType, data))
      .catch((error) => handleAuthErrors(error, setError, setSubmissionError))
      .finally(() => setLoadingStatus('complete'));
  };

  const handleResponse = async (
    response: AxiosResponse | void,
    formType: LoginFormType,
    data: LoginFormInputs
  ) => {
    if (response) {
      switch (formType) {
        case 'signUp':
          await signIn(data);
          break;

        case 'signIn':
          if (!response.data.token) setSubmissionError(loginFormData.submissionErrors.unknownError);
          await setReceivedAppData(response);
          navigate(routes.BOARDS);
          break;

        default:
          break;
      }
    } else {
      setSubmissionError(loginFormData.submissionErrors.serverNotResponding);
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
        <Container minHeight={65} key={name}>
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

  if (isAuthenticatedUser) return <Navigate to={routes.BOARDS} replace />;

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

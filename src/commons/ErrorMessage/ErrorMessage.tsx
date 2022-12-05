import classes from './ErrorMessage.module.scss';

export const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => {
  return <div className={classes.errorMessage}>{message}</div>;
};

type ErrorMessageProps = {
  message: string;
};

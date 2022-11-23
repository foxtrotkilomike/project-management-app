import classes from './ErrorBoundary.module.scss';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorBoundary = ({}: Props): JSX.Element => {
  const error = useRouteError() as Error;
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <p className={classes.root}>You are not authorized to view this page</p>;
    }

    if (error.status === 503) {
      return (
        <div className={classes.root}>
          <p className={classes.errorTitle}>Sorry, an unexpected error has occurred</p>
          <p className={classes.errorCaption}>error.message</p>
        </div>
      );
    }
  }

  return (
    <div className={classes.root}>
      <p className={classes.errorTitle}>This page doesn&#39;t exist</p>
      <p className={classes.errorCaption}>
        Go to <Link to="/">main page</Link>
      </p>
    </div>
  );
};

type Props = Record<string, string>;

export default ErrorBoundary;

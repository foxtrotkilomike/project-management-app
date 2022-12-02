import { RouteObject } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../layouts/ErrorBoundary';
import Welcome from '../layouts/Welcome';
import Boards from '../layouts/Boards';
import Board from '../layouts/Board';
import Profile from '../layouts/Profile';
import LogIn from '../layouts/LogIn';
import PrivateRoute from '../commons/PrivateRoute';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <Welcome />,
          },
          {
            path: 'boards',
            element: (
              <PrivateRoute>
                <Boards />
              </PrivateRoute>
            ),
          },
          {
            path: 'board/:boardId',
            element: (
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            ),
          },
          {
            path: 'signup',
            element: <LogIn type="signUp" />,
          },
          {
            path: 'signin',
            element: <LogIn type="signIn" />,
          },
          {
            path: 'profile/edit',
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
          {
            path: '*',
            element: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
];

export const routes = {
  MAIN: '/',
  BOARDS: '/boards',
  BOARD: '/board',
  SIGN_UP: '/signup',
  SIGN_IN: '/signin',
  PROFILE: '/profile',
};

export const privateRoutes = [routes.BOARDS, routes.BOARD, routes.PROFILE];

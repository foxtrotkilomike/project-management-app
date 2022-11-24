import { RouteObject } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../layouts/ErrorBoundary';
import Welcome from '../layouts/Welcome';
import Boards from '../layouts/Boards';
import Board from '../layouts/Board';
import SignUp from '../layouts/SignUp';
import SignIn from '../layouts/SignIn';
import Profile from '../layouts/Profile';

export const routes: RouteObject[] = [
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
            children: [
              {
                index: true,
                element: <Boards />,
              },
              {
                path: 'board/:boardId',
                element: <Board />,
              },
            ],
          },
          {
            path: 'signup',
            element: <SignUp />,
          },
          {
            path: 'signin',
            element: <SignIn />,
          },
          {
            path: 'profile/edit',
            element: <Profile />,
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

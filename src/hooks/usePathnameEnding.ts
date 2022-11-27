import { useLocation } from 'react-router-dom';

export const usePathnameEnding = () => {
  const location = useLocation();
  const pathnameEnding = location.pathname.split('/').pop() as string;

  return pathnameEnding;
};

import { useLocation } from 'react-router-dom';
import { privateRoutes } from '../config/routes';
import { useEffect, useState } from 'react';

export const usePrivateRoute = () => {
  const location = useLocation();
  const [isPrivateRoute, setIsPrivateRoute] = useState(false);

  useEffect(() => {
    const pathNameRoot = location.pathname.split('/')[1];
    setIsPrivateRoute(privateRoutes.includes(pathNameRoot));
  }, [location]);

  return isPrivateRoute;
};

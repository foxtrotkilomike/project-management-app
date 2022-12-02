import React, { useState } from 'react';
import { AppData, User } from '../../config/types';
import { getAppData } from '../../services/authService';
import { AuthContext } from './authContext';

const getUserData = (key: keyof AppData) => {
  const userData = getAppData(key);
  return userData ? userData : '';
};

const initializeUserData = (): User => ({
  _id: getUserData('userId'),
  name: getUserData('userName'),
  login: getUserData('userLogin'),
});

const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<User>(initializeUserData);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export default AuthContextProvider;

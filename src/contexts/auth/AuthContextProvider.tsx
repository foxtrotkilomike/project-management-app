import React, { useState } from 'react';
import { AppData } from '../../config/data';
import { UserResponse } from '../../services/users/types';
import { AuthContext } from './authContext';
import { getAppData } from '../../helpers/handleAppData';

const getUserData = (key: AppData) => {
  const userData = getAppData(key);
  return userData ? userData : '';
};

const initializeUserData = (): UserResponse => ({
  _id: getUserData(AppData.USER_ID),
  name: getUserData(AppData.USER_NAME),
  login: getUserData(AppData.USER_LOGIN),
});

const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserResponse>(initializeUserData);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export default AuthContextProvider;

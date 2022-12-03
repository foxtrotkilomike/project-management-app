import React from 'react';
import AuthContextProvider from './auth/AuthContextProvider';

const AppContextProvider = ({ children }: AppContextProviderProps): JSX.Element => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

type AppContextProviderProps = {
  children: React.ReactNode;
};

export default AppContextProvider;

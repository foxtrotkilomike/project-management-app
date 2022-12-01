import { createContext, useContext } from 'react';
import { User } from '../../config/types';

const AuthContext = createContext<AuthContext>({
  user: {
    _id: '',
    login: '',
    name: '',
  },
  setUser: () => {},
});

const useAuthContext = () => useContext(AuthContext);

interface AuthContext {
  user: User;
  setUser: (user: User) => void;
}

export { AuthContext, useAuthContext };

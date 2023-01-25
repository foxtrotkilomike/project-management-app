import { createContext, useContext } from 'react';
import { UserResponse } from '../../services/users/types';

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
  user: UserResponse;
  setUser: (user: UserResponse) => void;
}

export { AuthContext, useAuthContext };

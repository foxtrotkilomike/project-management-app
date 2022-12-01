import { createContext, useContext } from 'react';
import { UserResponse } from '../../services/users/types';

const authContext = createContext<AuthContext>({
  user: {
    _id: '',
    login: '',
    name: '',
  },
  setUser: () => {},
});

const useAuthContext = () => useContext(authContext);

interface AuthContext {
  user: UserResponse;
  setUser: (user: UserResponse) => void;
}

export { authContext, useAuthContext };

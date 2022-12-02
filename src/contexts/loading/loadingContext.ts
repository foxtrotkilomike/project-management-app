import { createContext, useContext } from 'react';
import { LoadingStatus } from '../../config/types';

const LoadingContext = createContext<LoadingContext>({
  loadingStatus: 'complete',
  setLoadingStatus: () => {},
});

const useLoadingContext = () => useContext(LoadingContext);

interface LoadingContext {
  loadingStatus: LoadingStatus;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

export { LoadingContext, useLoadingContext };

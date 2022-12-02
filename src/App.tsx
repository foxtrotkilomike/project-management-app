import classes from './App.module.scss';
import { useState } from 'react';
import { LoadingStatus } from './config/types';
import { LoadingContext } from './contexts/loading/loadingContext';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Outlet } from 'react-router-dom';
import AppContextProvider from './contexts/AppContextProvider';
import Spinner from './commons/Spinner';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('complete');

  return (
    <AppContextProvider>
      <LoadingContext.Provider value={{ loadingStatus, setLoadingStatus }}>
        {loadingStatus === 'loading' && <Spinner />}
        <div className={classes.root}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </LoadingContext.Provider>
    </AppContextProvider>
  );
};

export default App;

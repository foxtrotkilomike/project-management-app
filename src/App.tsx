import classes from './App.module.scss';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Outlet } from 'react-router-dom';
import AppContextProvider from './contexts/AppContextProvider';

const App = () => {
  return (
    <AppContextProvider>
      {/* TODO add spinner */}
      <div className={classes.root}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;

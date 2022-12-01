import classes from './App.module.scss';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className={classes.root}>
      {/* TODO add spinner */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

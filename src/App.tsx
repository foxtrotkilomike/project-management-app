import classes from './App.module.scss';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

const App = () => {
  return (
    <div className={classes.root}>
      <Header />
      <Footer />
    </div>
  );
};

export default App;

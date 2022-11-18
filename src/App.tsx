import classes from './App.module.scss';
import Header from './layouts/Header';

const App = () => {
  return (
    <div className={classes.root}>
      <Header />
    </div>
  );
};

export default App;

import { technologiesList, developersList } from '../../config/data';
import Container from '../../commons/Container';
import classes from './Welcome.module.scss';

export const Welcome = ({}: Props): JSX.Element => {
  const renderTechnologiesList = () => {
    return technologiesList.map((item) => (
      <li className={classes.technologyItem} key={item.id}>
        <a href={item.link} className={classes.technologyLink} target="_blank" rel="noreferrer">
          <img src={item.imgSrc} alt={item.title} />
          <span>{item.title}</span>
        </a>
      </li>
    ));
  };

  const renderDevelopersList = () => {
    return developersList.map((item) => (
      <li className={classes.developerItem} key={item.id}>
        <a href={item.link} className={classes.developerLink} target="_blank" rel="noreferrer">
          <img className={classes.developerImg} src={item.imgSrc} alt={item.name} />
        </a>
        <p className={classes.developerText}>{item.descr}</p>
      </li>
    ));
  };

  return (
    <div className={classes.root}>
      <Container centered main textAlignCenter>
        <h1 className={classes.title}>Сraving for productivity?</h1>
        <h3 className={classes.subtitle}>
          Our app is perfectly designed to help you organize your project workflow using{' '}
          <a
            href="https://en.wikipedia.org/wiki/Kanban_(development)"
            target="_blank"
            rel="noreferrer"
          >
            kanban
          </a>{' '}
          method. Sign up and give it a try! &#128640;
        </h3>
        <h4 className={classes.text}>This app is powered by:</h4>
        <ul className={classes.technologiesList}>{renderTechnologiesList()}</ul>
        <h2 className={classes.teamTitle}>Our team</h2>
        <ul className={classes.developersList}>{renderDevelopersList()}</ul>
      </Container>
    </div>
  );
};

type Props = Record<string, string>;

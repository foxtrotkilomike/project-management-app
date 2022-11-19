import classes from './Footer.module.scss';
import rsSchoolLogo from '../../assets/svg/rs_school.svg';
import Container from '../../commons/Container';
import { footerData } from '../../config/data';
import { deleteLastArrayItem } from '../../helpers/deleteLastArrayItem';

const Footer = (): JSX.Element => {
  const renderFooterLinks = () => {
    const linkElements: JSX.Element[] = [];
    footerData.developers.forEach((developer) => {
      linkElements.push(
        <a
          href={developer.githubLink}
          className={classes.authorItem}
          target="_blank"
          rel="noreferrer"
          key={developer.name}
        >
          {developer.name}
        </a>
      );
      linkElements.push(<span key={developer.githubLink}>|</span>);
    });
    return deleteLastArrayItem(linkElements);
  };

  return (
    <footer className={classes.footer}>
      <Container centered>
        <div className={classes.footerContent}>
          <p className={classes.footerYear}>&#169; {footerData.year}</p>
          <div className={classes.footerAuthors}>{renderFooterLinks()}</div>
          <a
            href="https://rs.school/js/"
            className={classes.footerLogoLink}
            target="_blank"
            rel="noreferrer"
          >
            <img src={rsSchoolLogo} alt="Rolling Scopes School" />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

import classes from './Footer.module.scss';
import rsSchoolLogo from '../../assets/svg/rs_school.svg';
import CenteredContainer from '../../commons/CenteredContainer';
import { footerData } from '../../config/data';
import { deleteLastMember } from '../../helpers/deleteLastMember';

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
    return deleteLastMember(linkElements);
  };

  return (
    <footer className={classes.footer}>
      <CenteredContainer>
        <div className={classes.footerContent}>
          <p className={classes.footerYear}>{footerData.year}</p>
          <div className={classes.footerAuthors}>{renderFooterLinks()}</div>
          <a
            href="https://rs.school/js/"
            className={classes.footerLogoLink}
            target="_blank"
            rel="noreferrer"
          >
            <img src={rsSchoolLogo} alt="Rolling Scopes School link" />
          </a>
        </div>
      </CenteredContainer>
    </footer>
  );
};

export default Footer;

import { profilePageConfig } from '../../config/data';

import TwoColumnsFlex from '../TwoColumnsFlex';
import NavigationButton from '../../commons/NavigationButton';
import ArrowLeftIcon from '../../assets/svg/arrow-left.svg';
import EditProfileForm, { EditProfileFormProps } from './EditProfileForm';
import { BACK_ONE_PAGE } from '../../config/constants';

export const Profile = (): JSX.Element => {
  const { heading, form } = profilePageConfig;

  const leftColumn = (
    <NavigationButton
      location={BACK_ONE_PAGE}
      size="lg"
      icon={ArrowLeftIcon}
      text="Back"
      ariaLabel="Navigate back"
    />
  );

  const rightColumn = (
    <>
      <h1>{heading}</h1>
      <EditProfileForm {...form} />
    </>
  );

  return <TwoColumnsFlex leftColumn={leftColumn} rightColumn={rightColumn} />;
};

export type ProfilePageData = {
  heading: string;
  form: EditProfileFormProps;
};

import classes from './Profile.module.scss';

export const Profile = ({}: Props): JSX.Element => {
  return (
    <div>
      This is Profile page
      {/*
        This page will contain a form for profile editing
        <EditProfile />
      */}
    </div>
  );
};

type Props = Record<string, string>;

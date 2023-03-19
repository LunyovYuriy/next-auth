import ProfileForm from '@/src/pages/Profile/components/ProfileForm/ProfileForm';
import classes from '@/src/pages/Profile/components/scss/ProfileView.module.scss';

function ProfileView() {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default ProfileView;

import ProfileForm from '@/src/pages/Profile/components/ProfileForm/ProfileForm';
import classes from '@/src/pages/Profile/components/UserProfile/scss/UserProfile.module.scss';

function UserProfile() {
  // Redirect away if NOT auth

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;

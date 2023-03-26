import classes from '@/src/pages/Profile/components/ProfileForm/scss/ProfileForm.module.scss';
import useProfileForm from '@/src/pages/Profile/components/ProfileForm/hooks/useProfileForm';

function ProfileForm() {
  const {
    oldPassword,
    newPassword,
    isLoading,
    setOldPassword,
    setNewPassword,
    onSubmit,
  } = useProfileForm();

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </div>
      <div className={classes.action}>
        <button disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Change Password'}
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import classes from '@/src/pages/Profile/components/scss/ProfileView.module.scss';
import ProfileForm from '@/src/pages/Profile/components/ProfileForm/ProfileForm';

function ProfileView() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/auth';
      } else {
        setIsLoading(false);
      }
    });
  });

  return (
    <section className={classes.profile}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Your User Profile</h1>
          <ProfileForm />
        </>
      )}
    </section>
  );
}

export default ProfileView;

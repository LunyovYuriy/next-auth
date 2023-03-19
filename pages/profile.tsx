import ProfileView from '@/src/pages/Profile/ProfileView';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

function Profile() {
  return <ProfileView />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Profile;

import AuthView from '@/src/pages/Auth/AuthView';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

function Auth() {
  return <AuthView />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isLogged: !!session,
    },
  };
}

export default Auth;

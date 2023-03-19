import NextAuth, { Awaitable } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB, findDocument } from '@/src/helpers/mongodb';
import { verifyPassword } from '@/src/helpers/auth';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        const client = await connectMongoDB();

        const user = await findDocument(client, 'users', {
          email: credentials?.email,
        });

        if (user) {
          const isValid = await verifyPassword(
            credentials?.password || '',
            user.password
          );

          if (isValid) {
            client.close();

            return { email: user.email };
          } else {
            client.close();

            throw new Error('Invalid password');
          }
        } else {
          client.close();

          throw new Error('User not found!');
        }
      },
    }),
  ],
});

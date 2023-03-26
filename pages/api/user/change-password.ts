import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
  connectMongoDB,
  findDocument,
  updateDocument,
} from '@/src/helpers/mongodb';
import { hashPassword, verifyPassword } from '@/src/helpers/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(422).json({ message: 'Invalid input' });
    return;
  }

  const client = await connectMongoDB();

  const user = await findDocument(client, 'users', {
    email: userEmail,
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    await client.close();
    return;
  }

  const currentPassword = user.password;

  const isPasswordValid = await verifyPassword(oldPassword, currentPassword);

  if (!isPasswordValid) {
    res.status(422).json({ message: 'Old password is not correct!' });
    await client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await updateDocument(
    client,
    'users',
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  await client.close();

  res.status(200).json({
    message: 'Password changed successfully!',
  });
}
export default handler;

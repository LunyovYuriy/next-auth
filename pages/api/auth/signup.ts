import type { NextApiRequest, NextApiResponse } from 'next';
import {
  connectMongoDB,
  findDocument,
  insertDocument,
} from '@/src/helpers/mongodb';
import { hashPassword } from '@/src/helpers/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (
      !email ||
      !email.trim() ||
      !email.includes('@') ||
      !password ||
      !password.trim()
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const client = await connectMongoDB();

    const existingUser = await findDocument(client, 'users', {
      email,
    });

    if (existingUser) {
      res.status(422).json({ message: 'User already exists!' });
      await client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await insertDocument(client, 'users', {
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: 'User created', userId: result.insertedId });

    await client.close();
  }
}
export default handler;

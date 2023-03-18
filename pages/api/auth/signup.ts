import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB, insertDocument } from '@/src/helpers/mongodb';
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

    const hashedPassword = await hashPassword(password);

    const result = await insertDocument(client, 'users', {
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: 'User created', userId: result.insertedId });
  }
}
export default handler;

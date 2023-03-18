import { MongoClient } from 'mongodb';

export const connectMongoDB: () => Promise<MongoClient> = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.pkh9xga.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: {}
) => {
  const db = client.db(process.env.MONGODB_DATABASE);
  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  filter: {} = {},
  sort: {} = { _id: -1 }
) => {
  const db = client.db(process.env.MONGODB_DATABASE);

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
};

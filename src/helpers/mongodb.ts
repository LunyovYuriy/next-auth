import { InsertOneResult, MongoClient } from 'mongodb';

export const connectMongoDB = async (): Promise<MongoClient> => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.pkh9xga.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: {}
): Promise<InsertOneResult<Document>> => {
  const db = client.db(process.env.MONGODB_DATABASE);
  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const findDocument = async (
  client: MongoClient,
  collection: string,
  filter: {} = {}
) => {
  const db = client.db(process.env.MONGODB_DATABASE);

  const document = await db.collection(collection).findOne(filter);

  return document;
};

export const findAllDocuments = async (
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

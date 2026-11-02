import { MongoClient } from "mongodb";

const SERVER_TIMEOUT_MS = 5000;
const ADMIN_DATABASE_NAME = "admin";

export async function createClient(settings) {
  const client = new MongoClient(settings.mongoUri, {
    serverSelectionTimeoutMS: SERVER_TIMEOUT_MS,
  });
  try {
    await client.connect();
    await client.db(ADMIN_DATABASE_NAME).command({ ping: 1 });
  } catch (error) {
    await client.close();
    throw error;
  }
  return client;
}

import { MongoClient } from "mongodb";
import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "http://localhost:3000";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

let cachedMongooseConnection: Connection | null = null;
let cachedMongoClient: MongoClient | null = null;

/**
 * Establish and return a Mongoose connection.
 * Reuses the connection if already cached.
 */
export default async function dbConnect(): Promise<Connection> {
  if (cachedMongooseConnection) {
    console.log("Using cached Mongoose connection");
    return cachedMongooseConnection;
  }

  try {
    const opts = { bufferCommands: false };
    const mongooseConnection = await mongoose.connect(MONGODB_URI, opts);
    cachedMongooseConnection = mongooseConnection.connection;
    console.log("Mongoose connection established");
    return cachedMongooseConnection;
  } catch (error) {
    cachedMongooseConnection = null;
    console.error("Failed to connect to Mongoose:", error);
    throw error;
  }
}

/**
 * Establish and return a raw MongoClient connection.
 * Reuses the connection if already cached.
 */
export async function getMongoDBClient(): Promise<MongoClient> {
  if (cachedMongoClient) {
    console.log("Using cached MongoDB client");
    return cachedMongoClient;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedMongoClient = client;
    console.log("MongoDB client connection established");
    return cachedMongoClient;
  } catch (error) {
    cachedMongoClient = null;
    console.error("Failed to connect MongoDB client:", error);
    throw error;
  }
}

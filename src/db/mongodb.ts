import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function connectToDatabase(): Promise<Mongoose> {
  const opts = {
    bufferCommands: false,
  };

  const connection = await mongoose.connect(MONGODB_URI, opts);
  return connection;
}

export default connectToDatabase;

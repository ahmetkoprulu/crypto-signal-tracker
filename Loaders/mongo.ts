import mongoose, { ConnectOptions } from "mongoose";
import { Db } from "mongodb";
import config from "../Config";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  return connection.connection.db;
};

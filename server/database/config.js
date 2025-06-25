import mongoose from "mongoose";

export const runDatabase = async () => {
  try {
    const connect = mongoose.connect(process.env.DATABASE_CONNECTION_FOR);
    await connect;
    console.log("Database Connection Running Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

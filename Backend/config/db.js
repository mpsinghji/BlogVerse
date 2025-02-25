import mongoose from "mongoose";

const connectdb = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      console.error("MONGODB_URL is not defined in environment variables.");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "BlogVerse",
    });

    console.log(`MongoDB is successfully connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectdb;

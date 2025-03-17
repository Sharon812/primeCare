import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const clientOptions = {
      serverApi: { version: "1", strict: false, deprecationErrors: true },
    };
    await mongoose.connect(process.env.MONGODB_URL, clientOptions);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error", error.message);
    process.exit(1);
  }
};

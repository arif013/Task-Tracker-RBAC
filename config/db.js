import mongoose from "mongoose";

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Successfully connected to mongodb"))
//   .catch((err) => console.error("MongoDB connection error", err));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB is connected`);
  } catch (err) {
    console.error("Mongo Error", err);
    process.exit(1);
  }
};

export default connectDB;
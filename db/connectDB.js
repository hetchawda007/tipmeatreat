import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('Attempting MongoDB connection...');
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Database connection failed'); 
  }
};

export default connectDB;
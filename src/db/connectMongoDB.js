import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
  }
  catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    throw error; // повторне викидання помилки для обробки на вищому рівні
  }
};
export default connectMongoDB;

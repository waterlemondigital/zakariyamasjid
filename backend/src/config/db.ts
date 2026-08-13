import mongoose from 'mongoose';

export const connectDB = async (): Promise<boolean> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zakariya_masjid';

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected Successfully: ${mongoose.connection.host}`);
    return true;
  } catch (error: any) {
    console.warn(`⚠️ MongoDB Connection Notice: ${error.message}`);
    console.warn(`👉 The backend is running. When MongoDB service is started on ${uri}, data will persist to the database.`);
    return false;
  }
};

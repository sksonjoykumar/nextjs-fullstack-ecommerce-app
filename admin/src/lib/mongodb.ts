import mongoose from 'mongoose';

export const connectToDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error('MONGODB_URL environment variable is not defined.');
    }
    await mongoose.connect(mongoUrl);
    console.log('Mongodb admin collection connection successfully.');
  } catch (error) {
    console.log('Mongodb admin connection error!', error);
  }
};

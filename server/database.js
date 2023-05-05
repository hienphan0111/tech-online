import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  const url = process.env.MONGO_URL;

  try {
    const connect = await mongoose.connect(url, {
      useUniFiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(err.message)
  }
};


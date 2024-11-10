import mongoose from 'mongoose';

dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;

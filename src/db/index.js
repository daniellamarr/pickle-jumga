import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const { connection } = mongoose;

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

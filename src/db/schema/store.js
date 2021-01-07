import mongoose from 'mongoose';

const { Schema } = mongoose;

const StoreSchema = new Schema({
  name: String,
  address: String,
  city: String,
  country: String,
  legalForm: String,
}, { timestamps: true });

export default StoreSchema;

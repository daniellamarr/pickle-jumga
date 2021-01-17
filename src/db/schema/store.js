import mongoose from 'mongoose';

const { Schema } = mongoose;

const StoreSchema = new Schema({
  name: String,
  address: String,
  city: String,
  country: String,
  legalForm: String,
  signupFeePaid: { type: Boolean, default: false },
}, { timestamps: true });

export default StoreSchema;

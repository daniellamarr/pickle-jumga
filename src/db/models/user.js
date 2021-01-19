import mongoose from 'mongoose';
import StoreSchema from '../schema/store';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstname: String,
  surname: String,
  phoneNumber: Number,
  address: String,
  dob: Date,
  email: String,
  password: String,
  type: String,
  accountVerified: { type: Boolean, default: false },
  wallet: { type: Number, default: 0 },
  store: StoreSchema,
}, { timestamps: true });

const User = model('User', UserSchema);

export default User;

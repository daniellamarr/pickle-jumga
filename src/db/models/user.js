import mongoose from 'mongoose';
import StoreSchema from '../schema/store';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstname: String,
  surname: String,
  phoneNumber: String,
  dob: Date,
  email: String,
  password: String,
  type: String,
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  store: StoreSchema,
}, { timestamps: true });

const User = model('User', UserSchema);

export default User;

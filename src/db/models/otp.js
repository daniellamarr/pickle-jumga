import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const OTPSchema = new Schema({
  code: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  expires: Date,
}, { timestamps: true });

const OTP = model('OTP', OTPSchema);

export default OTP;

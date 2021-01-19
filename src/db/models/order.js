import mongoose from 'mongoose';
import CartItemSchema from '../schema/cartItem';

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  ref: String,
  price: Number,
  items: [CartItemSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  deliveryMethod: String,
  status: String,
}, { timestamps: true });

const Order = model('Order', OrderSchema);

export default Order;

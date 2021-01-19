import mongoose from 'mongoose';
import CartItemSchema from '../schema/cartItem';

const { Schema, model } = mongoose;

const CartSchema = new Schema({
  price: Number,
  items: [CartItemSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const Cart = model('Cart', CartSchema);

export default Cart;

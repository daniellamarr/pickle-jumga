import mongoose from 'mongoose';

const { Schema } = mongoose;

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
}, { timestamps: true });

export default CartItemSchema;

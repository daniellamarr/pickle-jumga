import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  image: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });

const Product = model('Product', ProductSchema);

export default Product;

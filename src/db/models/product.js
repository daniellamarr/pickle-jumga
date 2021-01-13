import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: String,
  category: String,
  owner: String,
  image: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });

const Product = model('Product', ProductSchema);

export default Product;

import mongoose, { Schema, Model } from 'mongoose';
import { Product as IProduct } from '../../types';

interface ProductDocument extends IProduct {}

const ProductSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Product: Model<ProductDocument> =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

export default Product;

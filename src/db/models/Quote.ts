import mongoose, { Schema, Model } from 'mongoose';
import { Quote as IQuote } from '../../types';

interface QuoteDocument extends IQuote {}

const InventoryStatusSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  requestedQuantity: { type: Number, required: true },
  available: { type: Boolean, required: true },
});

const QuoteSchema = new Schema({
  id: { type: String, required: true },
  customer: { type: String, required: true },
  products: { type: [InventoryStatusSchema], required: true },
  outOfStockProducts: { type: [InventoryStatusSchema], required: false },
  totalPrice: { type: Number, required: true },
  relatedProducts: { type: String, required: false },
  shippingRestrictions: { type: String, required: false },
  status: { type: String, enum: ['draft', 'sent'], required: true },
  dueDate: { type: String, required: false },
});

const Quote: Model<QuoteDocument> =
  mongoose.models.Quote || mongoose.model<QuoteDocument>('Quote', QuoteSchema);

export default Quote;

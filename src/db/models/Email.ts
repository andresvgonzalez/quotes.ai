import mongoose, { Schema, Document, Model } from 'mongoose';

interface EmailDocument extends Document {
  quoteId: string;
  emailContent: string;
  inStock: boolean;
}

const EmailSchema = new Schema({
  quoteId: { type: String, required: true },
  emailContent: { type: String, required: true },
  inStock: { type: Boolean, required: true },
});

const Email: Model<EmailDocument> =
  mongoose.models.Email || mongoose.model<EmailDocument>('Email', EmailSchema);

export default Email;

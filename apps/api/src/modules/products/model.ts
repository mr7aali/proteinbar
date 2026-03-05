import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceMad: number;
  image: string;
  category: string;
  sku?: string;
  inStock: boolean;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string[];
  tags?: string[];
  availability: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    handle: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priceMad: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    sku: String,
    inStock: { type: Boolean, default: true },
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    allergens: [String],
    tags: [String],
    availability: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);

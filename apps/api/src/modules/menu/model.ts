import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  id: string;
  name: string;
  description: string;
  priceMad: number;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  category: string;
  image?: string;
  allergens?: string[];
  tags?: string[];
  availability: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface IMenuCategory extends Document {
  id: string;
  name: string;
  description: string;
  items: mongoose.Types.ObjectId[];
  displayOrder: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    priceMad: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    protein: { type: Number, min: 0 },
    carbs: { type: Number, min: 0 },
    fat: { type: Number, min: 0 },
    category: { type: String, required: true },
    image: String,
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

const menuCategorySchema = new Schema<IMenuCategory>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
    displayOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
export const MenuCategory = mongoose.model<IMenuCategory>('MenuCategory', menuCategorySchema);

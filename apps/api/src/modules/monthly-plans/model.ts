import mongoose, { Schema, Document } from 'mongoose';

export interface IMonthlyPlan extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  pricing: {
    basePrice: number;
    mealPrice: number;
    snackPrice: number;
  };
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const monthlyPlanSchema = new Schema<IMonthlyPlan>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    badge: String,
    pricing: {
      basePrice: { type: Number, default: 0 },
      mealPrice: { type: Number, default: 18 },
      snackPrice: { type: Number, default: 8 },
    },
    features: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const MonthlyPlan = mongoose.model<IMonthlyPlan>('MonthlyPlan', monthlyPlanSchema);

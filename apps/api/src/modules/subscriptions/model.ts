import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  planId: string;
  planTitle: string;
  selection: {
    meals: string;
    days: string;
    snacks: string;
    startDate: string;
    planType?: string;
  };
  delivery: {
    optionId: 'daily-delivery' | 'daily-pickup' | 'weekly-delivery' | 'weekly-pickup';
    address?: string;
    pickupLocation?: {
      id: string;
      name: string;
      address: string;
    };
  };
  status: 'active' | 'paused' | 'cancelled';
  pricing: {
    subtotal: number;
    discount: number;
    total: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: String, required: true },
    planTitle: { type: String, required: true },
    selection: {
      meals: { type: String, required: true },
      days: { type: String, required: true },
      snacks: { type: String, required: true },
      startDate: { type: String, required: true },
      planType: String,
    },
    delivery: {
      optionId: {
        type: String,
        enum: ['daily-delivery', 'daily-pickup', 'weekly-delivery', 'weekly-pickup'],
        required: true,
      },
      address: String,
      pickupLocation: {
        id: String,
        name: String,
        address: String,
      },
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled'],
      default: 'active',
    },
    pricing: {
      subtotal: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);

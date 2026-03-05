import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    handle: string;
    title: string;
    quantity: number;
    priceMad: number;
  }>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    emirate?: string;
    area?: string;
  };
  totals: {
    subtotal: number;
    giftDiscount: number;
    vat: number;
    safetyBag: number;
    grandTotal: number;
  };
  status: 'Pending' | 'Confirmed' | 'Prepared' | 'Delivered' | 'Cancelled';
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: 'COD' | 'Paid';
  confirmationStatus: 'Pending' | 'Confirmed' | 'Call back' | 'No answer';
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        handle: { type: String, required: true },
        title: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceMad: { type: Number, required: true, min: 0 },
      },
    ],
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      emirate: String,
      area: String,
    },
    totals: {
      subtotal: { type: Number, required: true },
      giftDiscount: { type: Number, default: 0 },
      vat: { type: Number, default: 0 },
      safetyBag: { type: Number, default: 0 },
      grandTotal: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Prepared', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Paid'],
      default: 'COD',
    },
    confirmationStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Call back', 'No answer'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);

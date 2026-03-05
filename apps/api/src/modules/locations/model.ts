import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  city: string;
  deliveryZones?: string[];
  timeSlots?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<ILocation>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    mapUrl: { type: String, required: true },
    city: { type: String, required: true },
    deliveryZones: [String],
    timeSlots: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Location = mongoose.model<ILocation>('Location', locationSchema);

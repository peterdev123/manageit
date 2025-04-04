import { Schema, Document } from 'mongoose';

export interface Transaction extends Document {
  userId: string;
  budgetId: string;
  name: string;
  amount: number;
  category: string;
  date: Date;
}

export const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  budgetId: { type: Schema.Types.ObjectId, ref: 'Budget', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['needs', 'wants', 'savings']
  },
  date: { type: Date, default: Date.now }
});
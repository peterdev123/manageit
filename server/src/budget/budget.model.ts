import { Schema, Document } from 'mongoose';

export interface Budget extends Document {
  userId: string;
  income: number;
  needs: number;
  wants: number;
  savings: number;
  date: Date;
  isActive: boolean;
}

export const BudgetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  income: { type: Number, required: true },
  needs: { type: Number, required: true, default: 0 },
  wants: { type: Number, required: true, default: 0 },
  savings: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

BudgetSchema.pre('save', function (next) {
  if (this.isModified('income')) {
    this.needs = Math.round(this.income * 0.5);
    this.wants = Math.round(this.income * 0.3);
    this.savings = Math.round(this.income * 0.2);
  }
  next();
});

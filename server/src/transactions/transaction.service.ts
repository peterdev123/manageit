import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = new this.transactionModel(createTransactionDto);
    return transaction.save();
  }

  async findByBudget(budgetId: string): Promise<Transaction[]> {
    const transactions = await this.transactionModel
      .find({ budgetId })
      .sort({ date: -1 })
      .exec();

    if (!transactions.length) {
      throw new NotFoundException('No transactions found');
    }
    return transactions;
  }

  async findByCategory(budgetId: string, category: string): Promise<Transaction[]> {
    const transactions = await this.transactionModel
      .find({ budgetId, category })
      .sort({ date: -1 })
      .exec();
    return transactions;
  }

  async update(id: string, updateData: Partial<CreateTransactionDto>): Promise<Transaction> {
    const transaction = await this.transactionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async remove(id: string): Promise<void> {
    const result = await this.transactionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
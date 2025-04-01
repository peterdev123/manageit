import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './budget.model';
import { Transaction } from '../transactions/transaction.model';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel('Budget') private readonly budgetModel: Model<Budget>,
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    await this.budgetModel.updateMany(
      { userId: createBudgetDto.userId, isActive: true },
      { isActive: false },
    );

    const createdBudget = new this.budgetModel(createBudgetDto);
    return createdBudget.save();
  }

  async findByUser(userId: string): Promise<Budget[]> {
    const budgets = await this.budgetModel
      .find({ userId })
      .sort({ date: -1 })
      .exec();

    if (!budgets.length) {
      throw new NotFoundException('No budgets found for this user');
    }

    return budgets;
  }

  async findActiveByUser(userId: string): Promise<Budget> {
    const budget = await this.budgetModel
      .findOne({ userId, isActive: true })
      .exec();

    if (!budget) {
      throw new NotFoundException('No active budget found for this user');
    }

    return budget;
  }

  async update(budgetId: string, income: number): Promise<Budget> {
    const budget = await this.budgetModel.findById(budgetId);

    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    budget.income = income;
    return budget.save();
  }

  async deactivate(budgetId: string): Promise<void> {
    const result = await this.budgetModel
      .findByIdAndUpdate(budgetId, { isActive: false })
      .exec();

    if (!result) {
      throw new NotFoundException('Budget not found');
    }
  }

  async getBudgetAnalytics(budgetId: string) {
    const budget = await this.budgetModel.findById(budgetId);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }

    const transactions = await this.transactionModel.find({ budgetId });

    const analytics = {
      needs: {
        allocated: budget.needs,
        spent: this.calculateSpentAmount(transactions, 'needs'),
        remaining: 0,
        percentage: 0
      },
      wants: {
        allocated: budget.wants,
        spent: this.calculateSpentAmount(transactions, 'wants'),
        remaining: 0,
        percentage: 0
      },
      savings: {
        allocated: budget.savings,
        spent: this.calculateSpentAmount(transactions, 'savings'),
        remaining: 0,
        percentage: 0
      }
    };

    // Calculate remaining and percentages
    ['needs', 'wants', 'savings'].forEach(category => {
      analytics[category].remaining = analytics[category].allocated - analytics[category].spent;
      analytics[category].percentage = (analytics[category].spent / analytics[category].allocated) * 100;
    });

    return analytics;
  }

  async getCategoryAnalytics(budgetId: string, category: string) {
    const budget = await this.budgetModel.findById(budgetId);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
  
    const transactions = await this.transactionModel
      .find({ budgetId, category })
      .sort({ date: -1 });
  
    const totalSpent = this.calculateSpentAmount(transactions, category);
    const allocated = budget[category];
    const remaining = allocated - totalSpent;
  
    return {
      overview: {
        allocated,
        spent: totalSpent,
        remaining,
        percentage: (totalSpent / allocated) * 100
      },
      transactions: transactions.map(t => ({
        name: t.name,
        amount: t.amount,
        date: t.date,
        percentageOfBudget: (t.amount / allocated) * 100
      })),
      insights: {
        averageTransaction: totalSpent / (transactions.length || 1),
        transactionCount: transactions.length,
        isOverBudget: totalSpent > allocated,
        remainingPercentage: (remaining / allocated) * 100
      }
    };
  }

  private calculateSpentAmount(transactions: Transaction[], category: string): number {
    return transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  }
}

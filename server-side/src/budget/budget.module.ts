import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetSchema } from './budget.model';
import { TransactionModule } from '../transactions/transaction.module';
import { TransactionSchema } from '../transactions/transaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Budget', schema: BudgetSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}

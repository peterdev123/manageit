import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiResponse({ status: 201 })
  async create(
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get('budget/:budgetId')
  @ApiResponse({ status: 200 })
  async findByBudget(@Param('budgetId') budgetId: string) {
    return this.transactionService.findByBudget(budgetId);
  }

  @Get('budget/:budgetId/category/:category')
  @ApiResponse({ status: 200 })
  async findByCategory(
    @Param('budgetId') budgetId: string,
    @Param('category') category: string,
  ) {
    return this.transactionService.findByCategory(budgetId, category);
  }

  @Patch(':id')
  @ApiResponse({ status: 200 })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateData: Partial<CreateTransactionDto>,
  ) {
    return this.transactionService.update(id, updateData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: string) {
    await this.transactionService.remove(id);
    return { message: 'Transaction removed' };
  }
}

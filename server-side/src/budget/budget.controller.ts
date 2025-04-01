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
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Budget')
@Controller('budget')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @ApiResponse({ status: 201 })
  async create(@Body(ValidationPipe) createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get(':userId')
  @ApiResponse({ status: 200 })
  async findByUser(@Param('userId') userId: string) {
    return this.budgetService.findByUser(userId);
  }

  @Get(':userId/active')
  @ApiResponse({ status: 200 })
  async findActiveByUser(@Param('userId') userId: string) {
    return this.budgetService.findActiveByUser(userId);
  }

  @Patch(':budgetId')
  @ApiResponse({ status: 200 })
  async update(
    @Param('budgetId') budgetId: string,
    @Body('income', ValidationPipe) income: number,
  ) {
    return this.budgetService.update(budgetId, income);
  }

  @Delete(':budgetId')
  @ApiResponse({ status: 200 })
  async deactivate(@Param('budgetId') budgetId: string) {
    await this.budgetService.deactivate(budgetId);
    return { message: 'Budget deactivated successfully' };
  }

  @Get(':budgetId/analytics')
  @ApiResponse({ status: 200 })
  async getAnalytics(@Param('budgetId') budgetId: string) {
    return this.budgetService.getBudgetAnalytics(budgetId);
  }

  @Get(':budgetId/category/:category')
  @ApiResponse({ status: 200 })
  async getCategoryAnalytics(
    @Param('budgetId') budgetId: string,
    @Param('category') category: string
  ) {
    return this.budgetService.getCategoryAnalytics(budgetId, category);
  }
}

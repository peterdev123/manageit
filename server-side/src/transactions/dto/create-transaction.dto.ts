import { IsNotEmpty, IsNumber, IsString, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly budgetId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(['needs', 'wants', 'savings'])
  readonly category: string;
}

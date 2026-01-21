import { UsePipes, ValidationPipe } from '@nestjs/common';
import { IsString, IsNumber, IsUUID, Min, MinLength } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsUUID()
  categoryId: string;

}

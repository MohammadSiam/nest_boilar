import { PartialType } from '@nestjs/mapped-types';
import { CreateWeeklyReviewDto } from './create-weekly-review.dto';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateWeeklyReviewDto extends PartialType(CreateWeeklyReviewDto) {
  @IsNumber()
  @IsNotEmpty()
  sleepScoreAvg: number;

  @IsNumber()
  @IsNotEmpty()
  walkCount: number;

  @IsNumber()
  @IsNotEmpty()
  exerciseCount: number;
}

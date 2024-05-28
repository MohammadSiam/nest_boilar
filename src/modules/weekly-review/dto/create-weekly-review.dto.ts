import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWeeklyReviewDto {
  @IsDateString()
  @IsNotEmpty()
  date: string; // Using string for date to ensure proper validation and parsing

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

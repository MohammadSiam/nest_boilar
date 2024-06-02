import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWeeklyReviewDto {
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

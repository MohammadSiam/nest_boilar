import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDailyReviewDto {
  @IsNumber()
  @IsNotEmpty()
  sleepScore: number;

  @IsString()
  @IsNotEmpty()
  walk: string;

  @IsString()
  @IsNotEmpty()
  exercise: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}

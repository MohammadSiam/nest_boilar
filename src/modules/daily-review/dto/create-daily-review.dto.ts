import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDailyReviewDto {
  @IsNumber()
  @IsNotEmpty()
  readonly sleepScore: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly walk: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly exercise: boolean;

  @IsString()
  @IsNotEmpty()
  readonly comment: string;

  @IsNotEmpty()
  readonly weeklyReviewId: number;
}

import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDailyReviewDto {
  readonly sleepScore: number;
  readonly walk: boolean;
  readonly exercise: boolean;
  readonly comment: string;
  readonly weeklyReviewId: number;
}

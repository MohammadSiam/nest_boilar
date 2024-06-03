import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyReviewDto } from './create-daily-review.dto';

export class UpdateDailyReviewDto extends PartialType(CreateDailyReviewDto) {
    readonly sleepScore: number;
    readonly walk: boolean;
    readonly exercise: boolean;
    readonly comment: string;
    readonly weeklyReviewId: number;
}

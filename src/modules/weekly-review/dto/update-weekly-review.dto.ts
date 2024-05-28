import { PartialType } from '@nestjs/mapped-types';
import { CreateWeeklyReviewDto } from './create-weekly-review.dto';

export class UpdateWeeklyReviewDto extends PartialType(CreateWeeklyReviewDto) {}

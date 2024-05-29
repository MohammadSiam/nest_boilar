import { Module } from '@nestjs/common';
import { DailyReviewService } from './daily-review.service';
import { DailyReviewController } from './daily-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReview } from './entities/daily-review.entity';
import { WeeklyReview } from '../weekly-review/entities/weekly-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyReview, WeeklyReview])],
  controllers: [DailyReviewController],
  providers: [DailyReviewService],
})
export class DailyReviewModule { }

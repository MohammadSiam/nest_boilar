import { Module } from '@nestjs/common';
import { WeeklyReviewService } from './weekly-review.service';
import { WeeklyReviewController } from './weekly-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyReview } from './entities/weekly-review.entity';
import { DailyReview } from '../daily-review/entities/daily-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeeklyReview, DailyReview])],
  controllers: [WeeklyReviewController],
  providers: [WeeklyReviewService],
  exports: [WeeklyReviewService],
})
export class WeeklyReviewModule {}

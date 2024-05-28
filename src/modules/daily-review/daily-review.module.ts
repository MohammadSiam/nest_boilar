import { Module } from '@nestjs/common';
import { DailyReviewService } from './daily-review.service';
import { DailyReviewController } from './daily-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReview } from './entities/daily-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyReview])],
  controllers: [DailyReviewController],
  providers: [DailyReviewService],
})
export class DailyReviewModule { }

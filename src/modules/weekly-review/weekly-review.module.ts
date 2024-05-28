import { Module } from '@nestjs/common';
import { WeeklyReviewService } from './weekly-review.service';
import { WeeklyReviewController } from './weekly-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyReview } from './entities/weekly-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeeklyReview])],
  controllers: [WeeklyReviewController],
  providers: [WeeklyReviewService],
})
export class WeeklyReviewModule { }

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WeeklyReviewService } from './weekly-review.service';
import { CreateWeeklyReviewDto } from './dto/create-weekly-review.dto';
import { UpdateWeeklyReviewDto } from './dto/update-weekly-review.dto';

@Controller('weekly-review')
export class WeeklyReviewController {
  constructor(private readonly weeklyReviewService: WeeklyReviewService) { }

  @Get()
  getWeeklyReviewList() {
    return this.weeklyReviewService.getWeeklyReviewList();
  }

  @Post()
  addWeeklyReview(@Query() query: {
    date: Date, sleepScoreAvg: number, walkCount: number, exerciseCount: number
  }) {
    return this.weeklyReviewService.addWeeklyReview(
      query.date, query.sleepScoreAvg, query.walkCount, query.exerciseCount
    );
  }

  @Post('update')
  updateWeeklyReview(@Query() query: {
    id: number, date: Date, sleepScoreAvg: number, walkCount: number, exerciseCount: number
  }) {
    return this.weeklyReviewService.updateWeeklyReview(
      query.id, query.date, query.sleepScoreAvg, query.walkCount, query.exerciseCount
    );
  }

  @Post('delete')
  deleteWeeklyReview(@Query() query: { id: number }) {
    return this.weeklyReviewService.deleteWeeklyReview(query.id);
  }

  @Post('calculate/sleep-score-average')
  calculateSleepScoreAvg(@Query() query: {
    id: number
  }) {
    return this.weeklyReviewService.calculateSleepScoreAvg(query.id);
  }

  @Post('calculate/walk-count')
  calculateWalkCount(@Query() query: {
    id: number
  }) {
    return this.weeklyReviewService.calculateWalkCount(query.id);
  }

  @Post('calculate/exercise-count')
  calculateExerciseCount(@Query() query: {
    id: number
  }) {
    return this.weeklyReviewService.calculateExerciseCount(query.id);
  }

  // 3つの機能を一度に処理する便利メソッド
  @Post('calculate')
  calculate(@Query() query: { id: number }) {
    this.weeklyReviewService.calculateSleepScoreAvg(query.id);
    this.weeklyReviewService.calculateWalkCount(query.id);
    this.weeklyReviewService.calculateExerciseCount(query.id);
    return 'OK';
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DailyReviewService } from './daily-review.service';
import { CreateDailyReviewDto } from './dto/create-daily-review.dto';
import { UpdateDailyReviewDto } from './dto/update-daily-review.dto';

@Controller('daily-review')
export class DailyReviewController {
  constructor(private readonly dailyReviewService: DailyReviewService) { }

  @Get()
  getDailyReviewList() {
    return this.dailyReviewService.getDailyReviewList();
  }

  @Post()
  addDailyReview(@Query() query: {
    sleepScore: number, walk: string, exercise: string, comment: string
  }) {
    console.log({ walk: query.walk });
    const walk: boolean = query.walk === 'true';
    const exercise: boolean = query.exercise === 'true';
    return this.dailyReviewService.addDailyReview(
      query.sleepScore, walk, exercise, query.comment
    );
  }

  @Post('update')
  updateDailyReview(@Query() query: {
    id: number, sleepScore: number, walk: string, exercise: string, comment: string
  }) {
    const walk: boolean = query.walk === 'true';
    const exercise: boolean = query.exercise === 'true';
    return this.dailyReviewService.updateDailyReview(
      query.id, query.sleepScore, walk, exercise, query.comment
    );
  }

  @Post('delete')
  deleteDailyReview(@Query() query: { id: number }) {
    return this.dailyReviewService.deleteDailyReview(query.id);
  }
}

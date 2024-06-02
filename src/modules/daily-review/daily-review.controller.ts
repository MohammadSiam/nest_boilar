import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DailyReviewService } from './daily-review.service';
import { CreateDailyReviewDto } from './dto/create-daily-review.dto';
import { CreateWeeklyReviewDto } from '../weekly-review/dto/create-weekly-review.dto';
import { WeeklyReview } from '../weekly-review/entities/weekly-review.entity';
import { WeeklyReviewService } from '../weekly-review/weekly-review.service';

@Controller('daily-review')
export class DailyReviewController {
  constructor(
    private readonly dailyReviewService: DailyReviewService,
    private readonly weeklyReviewService: WeeklyReviewService,
  ) { }

  @Get()
  getDailyReviewList() {
    return this.dailyReviewService.getDailyReviewList();
  }

  @Post('create')
  async addDailyReview(@Body() createDailyReviewDto: CreateDailyReviewDto) {
    try {
      const weeklyReview = await this.weeklyReviewService.getWeeklyReviewById(createDailyReviewDto.weeklyReviewId);
      return this.dailyReviewService.addDailyReview(createDailyReviewDto, weeklyReview);
    } catch (error) {
      throw error;
    }
  }

  @Post('update')
  updateDailyReview(
    @Query()
    query: {
      id: number;
      sleepScore: number;
      walk: string;
      exercise: string;
      comment: string;
    },
  ) {
    const walk: boolean = query.walk === 'true';
    const exercise: boolean = query.exercise === 'true';
    return this.dailyReviewService.updateDailyReview(
      query.id,
      query.sleepScore,
      walk,
      exercise,
      query.comment,
    );
  }

  @Post('delete')
  deleteDailyReview(@Query() query: { id: number }) {
    return this.dailyReviewService.deleteDailyReview(query.id);
  }
}

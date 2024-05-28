import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DailyReviewService } from './daily-review.service';
import { CreateDailyReviewDto } from './dto/create-daily-review.dto';

@Controller('daily-review')
export class DailyReviewController {
  constructor(private readonly dailyReviewService: DailyReviewService) {}

  @Get()
  getDailyReviewList() {
    return this.dailyReviewService.getDailyReviewList();
  }

  @Post('create')
  addDailyReview(@Body() createDailyReviewDto: CreateDailyReviewDto) {
    const walk: boolean = createDailyReviewDto.walk === 'true';
    const exercise: boolean = createDailyReviewDto.exercise === 'true';
    return this.dailyReviewService.addDailyReview(
      createDailyReviewDto.sleepScore,
      walk,
      exercise,
      createDailyReviewDto.comment,
    );
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

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DailyReviewService } from './daily-review.service';
import { CreateDailyReviewDto } from './dto/create-daily-review.dto';
import { CreateWeeklyReviewDto } from '../weekly-review/dto/create-weekly-review.dto';
import { WeeklyReview } from '../weekly-review/entities/weekly-review.entity';
import { WeeklyReviewService } from '../weekly-review/weekly-review.service';
import { UpdateDailyReviewDto } from './dto/update-daily-review.dto';

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

  @Get(':id')
  async getDailyReviewById(@Param('id') id: string) {
    return this.dailyReviewService.getDailyReviewById(+id);
  }

  @Post('create')
  async addDailyReview(@Body() createDailyReviewDto: CreateDailyReviewDto) {
    try {
      return this.dailyReviewService.addDailyReview(createDailyReviewDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('update/:id')
  updateDailyReview(
    @Body() updateDailyReviewDto: UpdateDailyReviewDto,
    @Param('id') id: string,
  ) {
    return this.dailyReviewService.updateDailyReview(updateDailyReviewDto, +id);
  }

  @Post('delete/:id')
  deleteDailyReview(@Param('id') id: string) {
    return this.dailyReviewService.deleteDailyReview(+id);
  }
}

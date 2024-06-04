import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateWeeklyReviewDto } from './dto/create-weekly-review.dto';
import { WeeklyReviewService } from './weekly-review.service';
import { UpdateWeeklyReviewDto } from './dto/update-weekly-review.dto';

@Controller('weekly-review')
export class WeeklyReviewController {
  constructor(private readonly weeklyReviewService: WeeklyReviewService) { }

  @Get()
  getWeeklyReviewList() {
    return this.weeklyReviewService.getWeeklyReviewList();
  }

  @Get(':id')
  async getWeeklyReviewById(@Param('id') id: string) {
    return this.weeklyReviewService.getWeeklyReviewById(+id);
  }

  @Post('create')
  addWeeklyReview(@Body() createWeeklyReviewDto: CreateWeeklyReviewDto) {
    return this.weeklyReviewService.addWeeklyReview(createWeeklyReviewDto);
  }

  @Post('update/:id')
  updateWeeklyReview(
    @Body() updateWeeklyReviewDto: UpdateWeeklyReviewDto,
    @Param('id') id: string,
  ) {
    return this.weeklyReviewService.updateWeeklyReview(
      updateWeeklyReviewDto,
      +id,
    );
  }

  @Post('delete')
  deleteWeeklyReview(@Query() query: { id: number }) {
    return this.weeklyReviewService.deleteWeeklyReview(query.id);
  }

  @Post('calculate/sleep-score-average')
  calculateSleepScoreAvg(@Param('id') id: string) {
    return this.weeklyReviewService.calculateSleepScoreAvg(+id);
  }

  @Post('calculate/walk-count')
  calculateWalkCount(@Query() query: { id: number }) {
    return this.weeklyReviewService.calculateWalkCount(query.id);
  }

  @Post('calculate/exercise-count')
  calculateExerciseCount(@Query() query: { id: number }) {
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeeklyReview } from './entities/weekly-review.entity';
import { CreateWeeklyReviewDto } from './dto/create-weekly-review.dto';
import { UpdateDailyReviewDto } from '../daily-review/dto/update-daily-review.dto';
import { UpdateWeeklyReviewDto } from './dto/update-weekly-review.dto';

@Injectable()
export class WeeklyReviewService {
  constructor(
    @InjectRepository(WeeklyReview)
    private readonly weeklyRepository: Repository<WeeklyReview>,
  ) { }
  getWeeklyReviewList() {
    return this.weeklyRepository.find({
      relations: ['dailyReviews'],
    });
  }

  async getWeeklyReviewById(id: number) {
    try {
      const weeklyReviewInfo = await this.weeklyRepository.find({ where: { id }, relations: ['dailyReviews'] });
      if (!weeklyReviewInfo)
        throw new NotFoundException('Could not find weekly review');
      return weeklyReviewInfo;
    } catch (error) {
      throw error;
    }
  }

  addWeeklyReview(CreateWeeklyReviewDto) {
    return this.weeklyRepository.save(CreateWeeklyReviewDto);
  }

  async updateWeeklyReview(
    updateWeeklyReviewDto: UpdateWeeklyReviewDto,
    id: number,
  ) {
    const weekly_review = await this.weeklyRepository.find({
      where: { id },
    });
    if (!weekly_review) throw new NotFoundException('No weekly review found');
    try {
      const weeklyReviewInfo = await this.weeklyRepository.save(
        updateWeeklyReviewDto,
      );
      if (!weeklyReviewInfo) throw new NotFoundException('No weekly review');
      return weeklyReviewInfo;
    } catch (error) {
      throw error;
    }
  }

  async calculateSleepScoreAvg(weeklyReviewId: number) {
    const weeklyReview = await this.weeklyRepository.findOne({
      where: { id: weeklyReviewId },
      relations: ['dailyReviews'],
    });

    const dailyReviews = weeklyReview.dailyReviews;
    const sleepScores = dailyReviews.map((dr) => dr.sleepScore);
    const sumSleepScore = sleepScores.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const avgSleepScore = parseFloat(
      (sumSleepScore / sleepScores.length).toFixed(2),
    );
    weeklyReview.sleepScoreAvg = avgSleepScore;
    this.weeklyRepository.save(weeklyReview);
    return avgSleepScore;
  }

  async calculateWalkCount(weeklyReviewId: number) {
    const weeklyReview = await this.weeklyRepository.findOne({
      where: { id: weeklyReviewId },
      relations: ['dailyReviews'],
    });
    const dailyReviews = weeklyReview.dailyReviews;
    const count = dailyReviews.filter(
      (dailyReview) => dailyReview.walk === true,
    ).length;
    weeklyReview.walkCount = count;
    this.weeklyRepository.save(weeklyReview);
    return count;
  }

  async calculateExerciseCount(weeklyReviewId: number) {
    const weeklyReview = await this.weeklyRepository.findOne({
      where: { id: weeklyReviewId },
      relations: ['dailyReviews'],
    });
    const dailyReviews = weeklyReview.dailyReviews;
    const count = dailyReviews.filter(
      (dailyReview) => dailyReview.exercise,
    ).length;
    weeklyReview.exerciseCount = count;
    this.weeklyRepository.save(weeklyReview);
    return count;
  }

  deleteWeeklyReview(id: number) {
    return this.weeklyRepository.delete({ id: id });
  }
}

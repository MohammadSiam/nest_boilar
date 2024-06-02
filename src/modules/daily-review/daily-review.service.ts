import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyReview } from './entities/daily-review.entity';
import { CreateDailyReviewDto } from './dto/create-daily-review.dto';
import { WeeklyReview } from '../weekly-review/entities/weekly-review.entity';

@Injectable()
export class DailyReviewService {
  constructor(
    @InjectRepository(DailyReview)
    private readonly dailyReviewRepository: Repository<DailyReview>,
    @InjectRepository(WeeklyReview)
    private readonly weeklyReviewRepository: Repository<WeeklyReview>,
  ) { }

  getDailyReviewList() {
    return this.dailyReviewRepository.find({ relations: ['weeklyReview'] });
  }

  async addDailyReview(createDailyReview: CreateDailyReviewDto, weeklyReview: WeeklyReview) {
    try {
      const dailyReviewInfo = await this.dailyReviewRepository.save({
        sleepScore: createDailyReview.sleepScore,
        walk: createDailyReview.walk,
        exercise: createDailyReview.exercise,
        comment: createDailyReview.comment,
      });
      if (!Array.isArray(weeklyReview.dailyReviews)) {
        weeklyReview.dailyReviews = [];
      }
      weeklyReview.dailyReviews = [...weeklyReview.dailyReviews, dailyReviewInfo];
      await this.weeklyReviewRepository.save({ ...weeklyReview, });
      return dailyReviewInfo;
    } catch (error) {
      throw error;
    }
  }

  async updateDailyReview(
    id: number,
    sleepScore: number,
    walk: boolean,
    exercise: boolean,
    comment: string,
  ) {
    const daily_review = await this.dailyReviewRepository.findOne({
      where: { id: id },
    });
    daily_review.sleepScore = sleepScore;
    daily_review.walk = walk;
    daily_review.exercise = exercise;
    daily_review.comment = comment;
    await this.dailyReviewRepository.save(daily_review);
  }

  deleteDailyReview(id: number) {
    return this.dailyReviewRepository.delete({ id: id });
  }
}

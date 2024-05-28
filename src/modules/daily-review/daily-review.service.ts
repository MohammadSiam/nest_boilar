import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyReview } from './entities/daily-review.entity';

@Injectable()
export class DailyReviewService {
  constructor(
    @InjectRepository(DailyReview)
    private readonly dailyReviewRepository: Repository<DailyReview>,
  ) {}

  getDailyReviewList() {
    return this.dailyReviewRepository.find({ relations: ['weeklyReview'] });
  }

  addDailyReview(
    sleepScore: number,
    walk: boolean,
    exercise: boolean,
    comment: string,
  ) {
    const dailyReview = new DailyReview();
    dailyReview.sleepScore = sleepScore;
    dailyReview.walk = walk;
    dailyReview.exercise = exercise;
    dailyReview.comment = comment;
    return this.dailyReviewRepository.insert(dailyReview);
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

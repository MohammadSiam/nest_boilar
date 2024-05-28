import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeeklyReview } from './entities/weekly-review.entity';

@Injectable()
export class WeeklyReviewService {
  constructor(
    @InjectRepository(WeeklyReview)
    private readonly weeklyRepository: Repository<WeeklyReview>,
  ) {}
  getWeeklyReviewList() {
    return this.weeklyRepository.find({
      relations: ['dailyReviews'],
      order: {
        date: 'ASC',
        id: 'DESC',
      },
    });
  }

  addWeeklyReview(
    date: Date,
    sleepScoreAvg: number,
    walkCount: number,
    exerciseCount: number,
  ) {
    const weeklyReview = new WeeklyReview();
    weeklyReview.date = date;
    weeklyReview.sleepScoreAvg = sleepScoreAvg;
    weeklyReview.walkCount = walkCount;
    weeklyReview.exerciseCount = exerciseCount;
    return this.weeklyRepository.insert(weeklyReview);
  }

  async updateWeeklyReview(
    id: number,
    date: Date,
    sleepScoreAvg: number,
    walkCount: number,
    exerciseCount: number,
  ) {
    const weekly_review = await this.weeklyRepository.findOne({
      where: { id: id },
    });
    weekly_review.date = date;
    weekly_review.sleepScoreAvg = sleepScoreAvg;
    weekly_review.walkCount = walkCount;
    weekly_review.exerciseCount = exerciseCount;
    await this.weeklyRepository.save(weekly_review);
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

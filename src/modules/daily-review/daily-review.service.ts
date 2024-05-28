import { Injectable } from '@nestjs/common';
import { CreateDailyReviewDto } from './dto/create-daily-review.dto';
import { UpdateDailyReviewDto } from './dto/update-daily-review.dto';
import { DailyReview } from './entities/daily-review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DailyReviewService {
  constructor(
    @InjectRepository(DailyReview)
    private readonly dailyReviewRepository: Repository<DailyReview>
  ) { }

  getDailyReviewList() {
    // return this.dailyReviewRepository.find(); ← 紐付けない場合
    return this.dailyReviewRepository.find({ relations: ["weeklyReview"] }); // ← 紐付ける場合
  }

  addDailyReview(sleepScore: number, walk: boolean, exercise: boolean, comment: string) {
    const dailyReview = new DailyReview();
    dailyReview.sleepScore = sleepScore;
    dailyReview.walk = walk;
    dailyReview.exercise = exercise;
    dailyReview.comment = comment;
    return this.dailyReviewRepository.insert(dailyReview);
  }

  async updateDailyReview(
    id: number, sleepScore: number, walk: boolean, exercise: boolean, comment: string
  ) {
    const daily_review = await this.dailyReviewRepository.findOne({ where: { id: id } });
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

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyReview } from './entities/daily-review.entity';
import { CreateDailyReviewDto } from './dto/create-daily-review.dto';
import { WeeklyReview } from '../weekly-review/entities/weekly-review.entity';
import { UpdateDailyReviewDto } from './dto/update-daily-review.dto';

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

  async getDailyReviewById(id: number) {
    try {
      const dailyReviewInfo = await this.dailyReviewRepository.find({ where: { intId: id }, relations: ['weeklyReview'] });
      if (!dailyReviewInfo) throw new NotFoundException('No daily review found');
      return dailyReviewInfo;
    } catch (error) {
      throw error;
    }
  }

  async addDailyReview(createDailyReview: CreateDailyReviewDto) {
    if (!createDailyReview.comment || !createDailyReview.weeklyReviewId) throw new BadRequestException('Comment and weeklyReviewId are required');
    try {
      const weeklyReviewId = createDailyReview.weeklyReviewId;
      const weeklyReview = await this.weeklyReviewRepository.findOne({
        where: { id: weeklyReviewId },
        relations: ['dailyReviews'],
      });
      if (!weeklyReview) throw new NotFoundException('No weekly review found');

      const dailyReviewInfo = this.dailyReviewRepository.create(createDailyReview);
      await this.dailyReviewRepository.save(dailyReviewInfo);

      weeklyReview.dailyReviews = [
        ...weeklyReview.dailyReviews,
        dailyReviewInfo,
      ];

      await this.weeklyReviewRepository.save(weeklyReview);

      return dailyReviewInfo;
    } catch (error) {
      console.error('Error adding daily review:', error);
      throw error;
    }
  }

  async updateDailyReview(
    updatedDailyReviewDto: UpdateDailyReviewDto,
    id: number,
  ) {
    const daily_review = await this.dailyReviewRepository.find({
      where: { intId: id },
    });
    if (!daily_review) throw new NotFoundException('No daily review found');
    try {
      const dailyReviewInfo = await this.dailyReviewRepository.save(
        updatedDailyReviewDto,
      );
      if (!dailyReviewInfo) throw new NotFoundException('No daily review');
      return dailyReviewInfo;
    } catch (error) {
      throw error;
    }
  }

  deleteDailyReview(id: number) {
    return this.dailyReviewRepository.delete({ intId: id });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyReviewController } from './weekly-review.controller';
import { WeeklyReviewService } from './weekly-review.service';

describe('WeeklyReviewController', () => {
  let controller: WeeklyReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyReviewController],
      providers: [WeeklyReviewService],
    }).compile();

    controller = module.get<WeeklyReviewController>(WeeklyReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

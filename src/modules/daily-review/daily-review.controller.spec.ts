import { Test, TestingModule } from '@nestjs/testing';
import { DailyReviewController } from './daily-review.controller';
import { DailyReviewService } from './daily-review.service';

describe('DailyReviewController', () => {
  let controller: DailyReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyReviewController],
      providers: [DailyReviewService],
    }).compile();

    controller = module.get<DailyReviewController>(DailyReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

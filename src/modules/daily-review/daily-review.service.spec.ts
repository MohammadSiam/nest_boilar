import { Test, TestingModule } from '@nestjs/testing';
import { DailyReviewService } from './daily-review.service';

describe('DailyReviewService', () => {
  let service: DailyReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyReviewService],
    }).compile();

    service = module.get<DailyReviewService>(DailyReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

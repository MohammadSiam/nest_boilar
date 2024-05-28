import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyReviewService } from './weekly-review.service';

describe('WeeklyReviewService', () => {
  let service: WeeklyReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyReviewService],
    }).compile();

    service = module.get<WeeklyReviewService>(WeeklyReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

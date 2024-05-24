import { Test, TestingModule } from '@nestjs/testing';
import { ActivityReservationService } from './activity-reservation.service';

describe('ActivityReservationService', () => {
  let service: ActivityReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityReservationService],
    }).compile();

    service = module.get<ActivityReservationService>(ActivityReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

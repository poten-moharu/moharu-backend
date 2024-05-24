import { Test, TestingModule } from '@nestjs/testing';
import { ActivityReservationController } from './activity-reservation.controller';
import { ActivityReservationService } from './activity-reservation.service';

describe('ActivityReservationController', () => {
  let controller: ActivityReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityReservationController],
      providers: [ActivityReservationService],
    }).compile();

    controller = module.get<ActivityReservationController>(ActivityReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

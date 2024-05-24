import { Injectable } from '@nestjs/common';
import { CreateActivityReservationDto } from './dto/create-activity-reservation.dto';
import { UpdateActivityReservationDto } from './dto/update-activity-reservation.dto';
import { ActivityReservation } from './entity/activity-reservation.entity';
import { ActivityReservationRepository } from './activity-reservation.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActivityReservationService {
  constructor(
    @InjectRepository(ActivityReservationRepository)
    private activityReservationRepository: ActivityReservationRepository,
  ) {}

  async reservationCreate(dto: CreateActivityReservationDto) {
    const activityReservation = new ActivityReservation();
    activityReservation.userId = dto.userId;
    activityReservation.activitiesId = dto.activitiesId;
    activityReservation.type = dto.type;
    activityReservation.name = dto.name;
    activityReservation.place = dto.place || null;
    activityReservation.date = dto.date;
    activityReservation.capacity = dto.capacity || null;
    activityReservation.amount = dto.amount;

    const test = this.activityReservationRepository.create({
      userId: dto.userId,
      activitiesId: dto.activitiesId,
      type: dto.type,
      name: dto.name,
      place: dto.place,
      date: dto.date,
      capacity: dto.capacity,
      amount: dto.amount,
    });

    return await this.activityReservationRepository.save(test);
  }

  findAll() {
    return `This action returns all activityReservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activityReservation`;
  }

  update(id: number, updateActivityReservationDto: UpdateActivityReservationDto) {
    return `This action updates a #${id} activityReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} activityReservation`;
  }
}

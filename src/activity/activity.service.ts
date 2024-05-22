import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entity/activity.entity';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activityRepository.create(createActivityDto);
    return this.activityRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  async findOne(id: number): Promise<Activity> {
    return this.activityRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    await this.activityRepository.update(id, updateActivityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.activityRepository.delete(id);
  }
  async findByCategory(categoryId: number): Promise<Activity[]> {
    return this.activityRepository.find({ where: { category_id: categoryId } });
  }
}

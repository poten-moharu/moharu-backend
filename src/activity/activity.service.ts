import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entity/activity.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activityRepository.create(createActivityDto);
    return this.activityRepository.save(activity);
  }

  async findAll(categoryId?: string, selectedDate?: string, user?: User): Promise<Activity[]> {
    const query = this.activityRepository.createQueryBuilder('activity');

    if (categoryId) {
      query.andWhere('activity.categoryId = :categoryId', { categoryId: +categoryId });
    }

    if (selectedDate) {
      query.andWhere(':selectedDate BETWEEN activity.startDate AND activity.endDate', { selectedDate });
    }

    if (!categoryId && user) {
      // 사용자 맞춤형 데이터 필터링 로직 (예시)
      // query.andWhere('activity.userPreferences @> :preferences', { preferences: user.preferences });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Activity> {
    return this.activityRepository.findOne({ where: { id } });
  }

  async update(id: number, updateActivityDto: CreateActivityDto): Promise<Activity> {
    await this.activityRepository.update(id, updateActivityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.activityRepository.delete(id);
  }
  async findByCategory(categoryId: number): Promise<Activity[]> {
    return this.activityRepository.find({ where: { categoryId: categoryId } });
  }
}

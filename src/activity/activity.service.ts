import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entity/activity.entity';
import { User } from '../user/entity/user.entity';
import { ActivityWishRepository } from '../activity-wish/activity-wish.repository';
import { In } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly activityWishRepository: ActivityWishRepository,
  ) {}

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
      // 사용자 맞춤형 데이터 필터링 로직
      const mbtiPreferences = {
        INFP: {
          meeting: [1, 5, 6],
          event: [1, 5, 6],
        },
        INFJ: {
          event: [1, 5, 6],
        },
        ENFJ: {
          event: [1, 5, 6],
        },
        ENFP: {
          meeting: [1, 5, 6],
          event: [1, 5, 6],
        },
        ISFP: {
          event: [1],
        },
        ESFP: {
          meeting: [1],
        },
        ISFJ: {
          event: [5],
        },
        ENTP: {
          meeting: [5, 6],
        },
        ESTJ: {
          meeting: [6],
        },
        ISTP: {
          place: [1, 5, 6],
        },
        INTJ: {
          place: [5],
          event: [6],
        },
        ENTJ: {
          event: [6],
        },
        ISTJ: {
          place: [6],
        },
      };

      const userMbti = user.mbti;
      const preferences = mbtiPreferences[userMbti];

      if (preferences) {
        const meetingCategories = preferences.meeting || [];
        const eventCategories = preferences.event || [];
        const placeCategories = preferences.place || [];

        query.andWhere(
          '(activity.type = :meeting AND activity.categoryId IN (:...meetingCategories)) OR (activity.type = :event AND activity.categoryId IN (:...eventCategories)) OR (activity.type = :place AND activity.categoryId IN (:...placeCategories))',
          {
            meeting: 'meeting',
            event: 'event',
            place: 'place',
            meetingCategories,
            eventCategories,
            placeCategories,
          },
        );
      }
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

  // 사용자가 좋아한 모든 액티비티를 조회
  async findAllWishedActivitiesByUserId(userId: number): Promise<Activity[]> {
    const wishes = await this.activityWishRepository.findAllWishesByUserId(userId);
    const activityIds = wishes.map((wish) => wish.activitiesId);
    return this.activityRepository.find({
      where: {
        id: In(activityIds),
      },
    });
  }
}

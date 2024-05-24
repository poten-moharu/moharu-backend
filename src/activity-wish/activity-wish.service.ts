import { Injectable } from '@nestjs/common';
import { ActivityWishRepository } from './activity-wish.repository';
import { ActivityWish } from './entity/activity-wish.entity';

@Injectable()
export class ActivityWishService {
  constructor(private readonly activityWishRepository: ActivityWishRepository) {}
  // 사용자가 특정 액티비티에 '좋아요'를 추가
  async addWish(userId: number, activitiesId: number): Promise<ActivityWish> {
    return this.activityWishRepository.addWish(userId, activitiesId);
  }

  // 사용자가 특정 액티비티에 대한 '좋아요'를 취소
  async removeWish(userId: number, activitiesId: number): Promise<void> {
    await this.activityWishRepository.removeWish(userId, activitiesId);
  }

  // 특정 사용자가 좋아한 모든 액티비티를 조회
  async findAllWishesByUserId(userId: number): Promise<ActivityWish[]> {
    return this.activityWishRepository.findAllWishesByUserId(userId);
  }

  async findAllWishesByUserIdReturnedNums(userId: number): Promise<number[]> {
    const wishes = await this.activityWishRepository.findAllWishesByUserId(userId);
    return wishes.map((wish) => wish.activitiesId);
  }

  // 특정 액티비티에 대한 모든 '좋아요'를 조회
  async findAllWishesByActivityId(activitiesId: number): Promise<ActivityWish[]> {
    return this.activityWishRepository.find({
      where: { activitiesId: activitiesId },
    });
  }
}

import { DataSource, Repository } from 'typeorm';
import { ActivityWish } from './entity/activity-wish.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityWishRepository extends Repository<ActivityWish> {
  constructor(private dataSource: DataSource) {
    super(ActivityWish, dataSource.createEntityManager());
  }

  // 예제 메서드: 특정 사용자가 '좋아요'한 모든 액티비티 조회
  async findAllWishesByUserId(userId: number): Promise<ActivityWish[]> {
    return this.find({
      where: { userId: userId },
      relations: ['user', 'activity'], // 사용자와 액티비티 엔티티와의 관계를 로드
    });
  }

  // 예제 메서드: 특정 액티비티에 대한 '좋아요' 추가
  async addWish(userId: number, activitiesId: number): Promise<ActivityWish> {
    const wish = this.create({
      userId: userId,
      activitiesId: activitiesId,
    });
    return this.save(wish);
  }

  // 예제 메서드: 특정 액티비티에 대한 '좋아요' 취소
  async removeWish(userId: number, activitiesId: number): Promise<void> {
    await this.delete({ userId: userId, activitiesId: activitiesId });
  }
}

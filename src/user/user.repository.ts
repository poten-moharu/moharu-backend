import { DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { SocialTypeEnum } from './enum';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findBySocialIdAndSocialType(socialId: string, socialType: SocialTypeEnum) {
    return await this.createQueryBuilder('users')
      .where('users.socialId = :socialId', { socialId })
      .andWhere('users.socialType = :socialType', { socialType })
      .getOne();
  }

  async findByEmailAndSocialType(email: string, socialType: SocialTypeEnum) {
    return await this.createQueryBuilder('users')
      .where('users.email = :email', { email })
      .andWhere('users.socialType = :socialType', { socialType })
      .getOne();
  }

  async findUserProfile(id: number) {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.activityWishes', 'activityWish')
      .leftJoinAndSelect('activityWish.activity', 'activity')
      .leftJoinAndSelect('activity.activityCategory', 'activityCategory')
      .select([
        'user.id',
        'user.name',
        'user.profileImage',
        'user.mbti',
        'user.gender',
        'user.region',
        'user.ageRange',
        'activityWish.id',
        'activityWish.activitiesId',
        'activity.id',
        'activity.coverImage',
        'activity.type',
        'activityCategory.name',
      ])
      .where('user.id = :userId', { userId: id })
      .orderBy('activity.id', 'DESC')
      .getOne();
  }
}

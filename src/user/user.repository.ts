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
}

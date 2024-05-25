import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { SocialTypeEnum } from './enum';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ActivityWishRepository } from 'src/activity-wish/activity-wish.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
    @InjectRepository(ActivityWishRepository) private activityWishRepository: ActivityWishRepository,
  ) {}

  async createUserFromSocialData(createUserDto: CreateUserDto, socialType: SocialTypeEnum): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.profileImage = createUserDto.profileImage || 'default-profile.jpg';
    user.telephone = createUserDto.telephone || null;
    user.mbti = createUserDto.mbti || null;
    user.ageRange = createUserDto.ageRange || null;
    user.gender = createUserDto.gender || null;
    user.region = createUserDto.region || null;
    user.socialType = socialType;
    user.socialId = createUserDto.socialId;

    return this.usersRepository.save(user);
  }

  async findByEmailAndSocialType(email: string, socialType: SocialTypeEnum) {
    return await this.usersRepository.findByEmailAndSocialType(email, socialType);
  }

  async createUserFromLocal(createUserDto: CreateUserDto) {
    // 이메일 중복 체크
    const existingUser = await this.usersRepository.findByEmailAndSocialType(createUserDto.email, SocialTypeEnum.LOCAL);
    if (existingUser) {
      throw new BadRequestException('This email is already registered.');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 새로운 사용자 생성
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.profileImage = createUserDto.profileImage || 'default-profile.jpg';
    user.telephone = createUserDto.telephone || null;
    user.mbti = createUserDto.mbti || null;
    user.ageRange = createUserDto.ageRange || null;
    user.gender = createUserDto.gender || null;
    user.region = createUserDto.region || null;
    user.socialType = SocialTypeEnum.LOCAL; // 로컬 회원가입으로 설정
    user.socialId = null; // 소셜 ID는 로컬 회원가입에서는 사용하지 않음
    user.password = hashedPassword;

    return this.usersRepository.save(user);
  }

  async validateLocalUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: createUserDto.email, socialType: SocialTypeEnum.LOCAL },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordMatching = await bcrypt.compare(createUserDto.password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return user;
  }

  async findBySocialIdAndSocialType(socialId: string, socialType: SocialTypeEnum) {
    return await this.usersRepository.findBySocialIdAndSocialType(socialId, socialType);
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async getUserProfile(id: number) {
    const userProfile = await this.usersRepository.findUserProfile(id);

    const activityWishes = userProfile.activityWishes;

    const categoryCount = activityWishes.reduce((acc, wish) => {
      const categoryName = wish.activity.activityCategory.name;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName]++;
      return acc;
    }, {});

    return {
      userProfile: {
        id: userProfile.id,
        name: userProfile.name,
        profileImage: userProfile.profileImage,
        mbti: userProfile.mbti,
        gender: userProfile.gender,
        region: userProfile.region,
        ageRange: userProfile.ageRange,
      },
      activityWishes: activityWishes.map((wish) => ({
        id: wish.id,
        activitiesId: wish.activitiesId,
        activity: {
          id: wish.activity.id,
          coverImage: wish.activity.coverImage,
          type: wish.activity.type,
          activityCategory: {
            name: wish.activity.activityCategory.name,
          },
        },
      })),
      wishTotalCount: activityWishes.length,
      categoryCount,
    };
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

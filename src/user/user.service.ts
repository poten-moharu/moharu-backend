import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { EmailCodeSendDto } from '../common/mailer/dto/email-code.dto';
import { MailVerifyService } from 'src/common/mailer/mail-verify.service';
import { EmailCodeVerifyDto } from 'src/common/mailer/dto/email-verify.dto';
import { SocialTypeEnum } from './enum';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
    private readonly mailVerifyService: MailVerifyService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
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

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async emailCodeSend(emailCodeSendDto: EmailCodeSendDto) {
    await this.mailVerifyService.emailCodeSend(emailCodeSendDto.email);
  }

  async emailCodeVerify(emailCodeVerifyDto: EmailCodeVerifyDto) {
    await this.mailVerifyService.emailCodeVerify(emailCodeVerifyDto);
  }

  async findBySocialIdAndSocialType(socialId: string, socialType: SocialTypeEnum) {
    return await this.usersRepository.findBySocialIdAndSocialType(socialId, socialType);
  }
}

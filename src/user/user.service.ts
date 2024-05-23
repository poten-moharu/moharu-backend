import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { EmailCodeSendDto } from '../common/mailer/dto/email-code.dto';
import { MailVerifyService } from 'src/common/mailer/mail-verify.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
    private readonly mailVerifyService: MailVerifyService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
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
}

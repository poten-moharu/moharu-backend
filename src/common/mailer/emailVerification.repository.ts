import { DataSource, Repository } from 'typeorm';
import { EmailVerification } from './entity/email-verifications.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailVerificationRepository extends Repository<EmailVerification> {
  constructor(private dataSource: DataSource) {
    super(EmailVerification, dataSource.createEntityManager());
  }
}

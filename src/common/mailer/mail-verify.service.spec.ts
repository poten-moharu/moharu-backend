import { Test, TestingModule } from '@nestjs/testing';
import { MailVerifyService } from './mail-verify.service';

describe('MailVerifyService', () => {
  let service: MailVerifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailVerifyService],
    }).compile();

    service = module.get<MailVerifyService>(MailVerifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-auth.strategy';
import { MailerModule } from '../common/mailer/mailer.module';
@Module({
  imports: [
    UserModule,
    MailerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        // expiresIn: JWT_EXPIRE_DATE,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

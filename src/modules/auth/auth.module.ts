import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthHttpController } from './auth.http.controller';
import { AuthMicroserviceController } from './auth.microservice.controller';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthHelper } from './helpers/auth.helper';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('app.auth.jwt.secret'),
        signOptions: {
          expiresIn: configService.get('app.auth.jwt.expiresIn'),
        },
      }),
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthHttpController, AuthMicroserviceController],
  providers: [AuthService, AuthHelper, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

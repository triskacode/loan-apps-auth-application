import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthHttpController } from './auth.http.controller';
import { AuthMicroserviceController } from './auth.microservice.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('microservice.user.host'),
            port: configService.get('microservice.user.port'),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthHttpController, AuthMicroserviceController],
  providers: [AuthService],
})
export class AuthModule {}

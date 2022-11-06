import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors(configService.get('app.cors'));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: configService.get('app.microservicePort') },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('app.httpPort'));
}
bootstrap();

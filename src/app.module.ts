import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppConfig } from './config/app.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

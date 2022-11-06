import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  cors: {
    origin: true,
    credentials: true,
  },
}));

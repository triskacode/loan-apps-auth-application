import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  httpPort: process.env.HTTP_PORT || 4000,
  microservicePort: process.env.MICROSERVICE_PORT || 10000,
  cors: {
    origin: true,
    credentials: true,
  },
  auth: {
    jwt: {
      secret: 'super-secret-token-for-jwt',
      expiresIn: 60 * 60 * 24,
    },
  },
}));

import { registerAs } from '@nestjs/config';

export const MicroserviceConfig = registerAs('microservice', () => ({
  user: {
    host: process.env.USER_SERVICE_HOST,
    port: process.env.USER_SERVICE_PORT,
  },
}));

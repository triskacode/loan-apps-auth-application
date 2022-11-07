import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceHelper } from 'src/common/helpers/microservice.helper';
import { AuthHelper } from 'src/modules/auth/helpers/auth.helper';
import { User } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    private authHelper: AuthHelper,
  ) {}

  async validateLocalStrategy(email: string, password: string) {
    const user = await this.findUserByEmailWithPassword(email);

    if (!user || !this.authHelper.comparePassword(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async generateToken(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id };

    return { accessToken: this.authHelper.generateToken(payload) };
  }

  async findUserByEmailWithPassword(email: string): Promise<User> {
    return MicroserviceHelper.sendRequest<User, { email: string }>(
      this.client,
      { endpoint: 'user', cmd: 'find-by-email-with-password' },
      { email },
    );
  }

  async findUserById(id: number): Promise<User> {
    return MicroserviceHelper.sendRequest<User, { id: number }>(
      this.client,
      { endpoint: 'user', cmd: 'find-by-id' },
      { id },
    );
  }
}

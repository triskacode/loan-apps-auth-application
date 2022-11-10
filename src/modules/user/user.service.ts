import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceHelper } from 'src/common/helpers/microservice.helper';
import { User } from 'src/domain/user';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_APPLICATION') private client: ClientProxy) {}

  async findUserByEmailWithPassword(email: string): Promise<User> {
    return MicroserviceHelper.sendRequest<User, FindUserByEmailDto>(
      this.client,
      { endpoint: 'user', cmd: 'find-by-email-with-password' },
      { email },
    );
  }

  async findUserById(id: number): Promise<User> {
    return MicroserviceHelper.sendRequest<User, FindUserByIdDto>(
      this.client,
      { endpoint: 'user', cmd: 'find-by-id' },
      { id },
    );
  }
}

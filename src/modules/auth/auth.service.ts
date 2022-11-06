import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  sum(param: number[]): Observable<number> {
    const pattern = { role: 'user', cmd: 'sum' };
    return this.client.send(pattern, param);
  }
}

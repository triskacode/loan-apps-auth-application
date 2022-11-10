import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserState } from 'src/domain/user';
import { AuthHelper } from 'src/modules/auth/helpers/auth.helper';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private authHelper: AuthHelper,
  ) {}

  async validateLocalStrategy(email: string, password: string) {
    const user = await this.userService.findUserByEmailWithPassword(email);

    if (!user || !this.authHelper.comparePassword(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    if (user.state === UserState.CREATED)
      throw new ForbiddenException('Your account has not been activated');

    if (user.state === UserState.SUSPENDED)
      throw new ForbiddenException('Your account has not been suspended');

    if (user.state === UserState.DELETED)
      throw new ForbiddenException('Your account has not been deleted');

    return user;
  }

  async generateToken(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id };

    return { accessToken: this.authHelper.generateToken(payload) };
  }

  async validateToken(token: string): Promise<User> {
    const { sub: id } = this.authHelper.verifyToken(token);

    return this.userService.findUserById(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  @Inject(JwtService)
  private jwtService: JwtService;

  comparePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  generateToken(payload: string | Buffer | object) {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token, { ignoreExpiration: false });
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}

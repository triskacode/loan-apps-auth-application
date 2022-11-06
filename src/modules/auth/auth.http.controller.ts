import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthHttpController {
  constructor(private authService: AuthService) {}

  @Get('coba')
  coba() {
    return this.authService.sum([10, 2]);
  }
}

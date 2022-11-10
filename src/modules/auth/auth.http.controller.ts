import {
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { User } from 'src/domain/user';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@UseInterceptors(TransformResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthHttpController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request & { user: User }) {
    return this.authService.generateToken(request.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() request: Request & { user: User }) {
    return request.user;
  }
}

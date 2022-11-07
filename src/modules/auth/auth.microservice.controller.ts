import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MicroservcieExceptionFilter } from 'src/common/filters/microservice-exception.filter';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller()
@UseFilters(MicroservcieExceptionFilter)
@UseInterceptors(TransformResponseInterceptor)
export class AuthMicroserviceController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ endpoint: 'auth', cmd: 'validate-token' })
  async validateToken(dto: ValidateTokenDto): Promise<User> {
    return this.authService.validateToken(dto.token);
  }
}

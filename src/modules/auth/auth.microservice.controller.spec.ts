import { Test, TestingModule } from '@nestjs/testing';
import { AuthMicroserviceController } from './auth.microservice.controller';

describe('AuthMicroserviceController', () => {
  let controller: AuthMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthMicroserviceController],
    }).compile();

    controller = module.get<AuthMicroserviceController>(AuthMicroserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

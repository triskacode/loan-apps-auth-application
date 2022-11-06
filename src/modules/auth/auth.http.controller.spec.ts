import { Test, TestingModule } from '@nestjs/testing';
import { AuthHttpController } from './auth.http.controller';

describe('AuthHttpController', () => {
  let controller: AuthHttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthHttpController],
    }).compile();

    controller = module.get<AuthHttpController>(AuthHttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

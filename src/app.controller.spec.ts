import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('healthCheck', () => {
    test('should return OK', () => {
      const result = controller.healthCheck();

      expect(result).toBe('OK');
    });
  });
});

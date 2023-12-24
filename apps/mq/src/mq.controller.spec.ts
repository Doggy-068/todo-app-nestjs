import { Test, TestingModule } from '@nestjs/testing';
import { MqController } from './mq.controller';
import { MqService } from './mq.service';

describe('MqController', () => {
  let mqController: MqController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MqController],
      providers: [MqService],
    }).compile();

    mqController = app.get<MqController>(MqController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mqController.getHello()).toBe('Hello World!');
    });
  });
});

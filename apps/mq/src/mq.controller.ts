import { Controller, Get } from '@nestjs/common';
import { MqService } from './mq.service';

@Controller()
export class MqController {
  constructor(private readonly mqService: MqService) {}

  @Get()
  getHello(): string {
    return this.mqService.getHello();
  }
}

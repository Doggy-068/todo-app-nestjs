import { Module } from '@nestjs/common';
import { MqController } from './mq.controller';
import { MqService } from './mq.service';

@Module({
  imports: [],
  controllers: [MqController],
  providers: [MqService],
})
export class MqModule {}

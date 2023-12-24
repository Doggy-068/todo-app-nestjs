import { NestFactory } from '@nestjs/core';
import { MqModule } from './mq.module';

async function bootstrap() {
  const app = await NestFactory.create(MqModule);
  await app.listen(3000);
}
bootstrap();

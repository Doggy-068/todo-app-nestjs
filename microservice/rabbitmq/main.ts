import { NestFactory } from '@nestjs/core'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost'],
      queue: 'todo-app-nestjs-queue',
      queueOptions: {
        durable: false
      }
    }
  })
  await app.listen()
}
bootstrap()

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RabbitmqController } from './rabbitmq.controller'

@Module({
  imports: [
    ClientsModule.register([{
      name: 'RABBITMQ_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost'],
        queue: 'todo-app-nestjs-queue',
        queueOptions: {
          durable: false
        }
      }
    }])
  ],
  controllers: [RabbitmqController]
})
export class RabbitmqModule { }

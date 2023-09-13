import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

@Controller()
export class AppController {
  @MessagePattern('post-message')
  consumeMessage(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(`data: ${data}, pattern: ${context.getPattern()}, next ...`)
  }
}

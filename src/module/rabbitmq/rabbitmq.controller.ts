import { Controller, Post, Body, Inject } from '@nestjs/common'
import { ClientRMQ } from '@nestjs/microservices'
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PostMessageDto } from './dto/rabbitmq.dto'

@ApiBearerAuth()
@ApiTags('Rabbitmq')
@Controller('api/rabbitmq')
export class RabbitmqController {
  constructor(@Inject('RABBITMQ_SERVICE') private clientRMQ: ClientRMQ) { }

  @Post('')
  @ApiOperation({ summary: 'Post a message.' })
  @ApiCreatedResponse({ description: 'The messsage has been successfully posted.' })
  postMessage(@Body() postMessageDto: PostMessageDto) {
    const { data } = postMessageDto
    this.clientRMQ.send('post-message', data).subscribe()
  }
}

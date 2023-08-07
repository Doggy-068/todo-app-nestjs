import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse } from '@nestjs/websockets'

@UseGuards(AuthGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class WsGateway {
  @SubscribeMessage('fetch')
  fetch(@MessageBody() data: any): WsResponse {
    return { event: 'fetch-response', data }
  }
}

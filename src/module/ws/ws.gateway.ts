import { UseGuards } from '@nestjs/common'
import { WsGuard } from './ws.guard'
import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse } from '@nestjs/websockets'

@UseGuards(WsGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class WsGateway {
  @SubscribeMessage('fetch')
  fetch(@MessageBody() data: any): WsResponse {
    return { event: 'fetch-response', data }
  }
}

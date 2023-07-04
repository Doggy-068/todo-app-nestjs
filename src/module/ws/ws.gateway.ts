import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse } from '@nestjs/websockets'

@WebSocketGateway({ cors: { origin: '*' } })
export class WsGateway {
  @SubscribeMessage('fetch')
  fetch(@MessageBody() data: any): WsResponse {
    return { event: 'fetch-response', data }
  }
}

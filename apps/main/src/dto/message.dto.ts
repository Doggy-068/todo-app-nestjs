import { ApiProperty } from '@nestjs/swagger'

class MessageUserReturnDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  nickname: string
}

export class MessageSendDto {
  @ApiProperty({ nullable: false })
  content: string

  @ApiProperty({ nullable: false })
  recipientId: string
}

export class MessageReturnDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  content: string

  @ApiProperty()
  date: string

  @ApiProperty({ type: () => MessageUserReturnDto })
  sender: MessageUserReturnDto

  @ApiProperty({ type: () => MessageUserReturnDto })
  recipient: MessageUserReturnDto
}

export class MessageLastReturnDto {
  @ApiProperty({ type: () => MessageUserReturnDto })
  contact: MessageUserReturnDto

  @ApiProperty({ type: () => MessageReturnDto })
  message: MessageReturnDto
}

export class MessageListReturnDto {
  @ApiProperty({ type: () => MessageUserReturnDto })
  contact: MessageUserReturnDto

  @ApiProperty({ type: () => [MessageReturnDto] })
  messages: MessageReturnDto[]
}

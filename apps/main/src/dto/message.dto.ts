import { ApiProperty } from '@nestjs/swagger'
import { UserReturnDto } from './user.dto'

export class SendMessageDto {
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

  @ApiProperty({ type: () => UserReturnDto })
  sender: UserReturnDto

  @ApiProperty({ type: () => UserReturnDto })
  recipient: UserReturnDto
}

export class LastMessageReturnDto {
  @ApiProperty({ type: () => UserReturnDto })
  contact: UserReturnDto

  @ApiProperty({ type: () => MessageReturnDto })
  message: MessageReturnDto
}

export class MessageListReturnDto {
  @ApiProperty({ type: () => UserReturnDto })
  contact: UserReturnDto

  @ApiProperty({ type: () => [MessageReturnDto] })
  messages: MessageReturnDto[]
}

import { ApiProperty } from '@nestjs/swagger'

export class PostMessageDto {
  @ApiProperty()
  data: string
}

import { ApiProperty } from '@nestjs/swagger'

export class UserReturnDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  nickname: string
}

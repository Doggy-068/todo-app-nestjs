import { ApiProperty } from '@nestjs/swagger'

export class AuthReturnDto {
  @ApiProperty()
  access_token: string
}

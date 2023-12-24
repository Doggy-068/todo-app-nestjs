import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ nullable: false })
  username: string

  @ApiProperty({ nullable: false })
  password: string
}

export class LoginSuccessReturnDto {
  @ApiProperty()
  access_token: string
}

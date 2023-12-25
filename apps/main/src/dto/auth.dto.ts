import { ApiProperty } from '@nestjs/swagger'

export class AuthLoginDto {
  @ApiProperty({ nullable: false })
  username: string

  @ApiProperty({ nullable: false })
  password: string
}

export class AuthLoginSuccessReturnDto {
  @ApiProperty()
  access_token: string
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AuthLoginDto {
  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string
}

export class AuthLoginSuccessReturnDto {
  @ApiProperty()
  access_token: string
}

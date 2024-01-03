import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { Public } from '../decorator/public.decorator'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthLoginDto, AuthLoginSuccessReturnDto } from '../dto/auth.dto'

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '验证 Token 是否有效'
  })
  @ApiOkResponse({
    type: Boolean
  })
  @Get('')
  validate(): boolean {
    return true
  }

  @ApiOperation({
    summary: '根据用户名和密码登录获取 Token'
  })
  @ApiOkResponse({
    type: AuthLoginSuccessReturnDto
  })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthLoginDto): Promise<AuthLoginSuccessReturnDto> {
    const { access_token } = await this.authService.signIn(loginDto.username, loginDto.password)
    return {
      access_token
    }
  }
}

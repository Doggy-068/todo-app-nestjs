import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { Public } from '../decorator/public.decorator'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginDto, LoginSuccessReturnDto } from '../dto/auth.dto'

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({
    summary: '根据用户名和密码登录获取 Token'
  })
  @ApiOkResponse({
    type: LoginSuccessReturnDto
  })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<LoginSuccessReturnDto> {
    return this.authService.signIn(loginDto.username, loginDto.password)
  }
}

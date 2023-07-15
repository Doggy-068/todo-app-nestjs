import { Controller, Get, Query, NotFoundException } from "@nestjs/common"
import { AuthService } from './auth.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthReturnDto } from './dto/auth.dto'
import { Public } from '../../decorator/public.decorator'

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Get('login')
  @ApiOperation({ summary: 'Login by account and password.' })
  @ApiOkResponse({ description: 'Login successfully.', type: AuthReturnDto })
  async login(@Query('account') account: string, @Query('password') password: string): Promise<AuthReturnDto> {
    if (await this.authService.validateAccountAndPassword(account, password)) {
      return {
        access_token: await this.authService.generateToken({ account })
      }
    }
    throw new NotFoundException()
  }
}

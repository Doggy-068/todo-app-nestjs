import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  /**
   * @description 验证用户名和密码并根据 ID 生成 JWT Token
   */
  async signIn(username: string, password: string) {
    const user = await this.userService.selectUser({ username, password })
    if (user === null) {
      throw new UnauthorizedException()
    }
    const payload = { id: user.id }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}

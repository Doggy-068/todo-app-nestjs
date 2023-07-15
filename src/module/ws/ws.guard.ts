import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '../auth/constant'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../decorator/public.decorator'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass()
      ])
      if (isPublic) return true
      const token = context.switchToWs().getClient().handshake.auth.token
      await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
    } catch {
      throw new WsException('Invalid credentials.')
    }
    return true
  }
}

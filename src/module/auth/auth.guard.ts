import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constant'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../decorator/public.decorator'
import { GqlExecutionContext } from '@nestjs/graphql'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  private extractTokenFromHeader(request: Request): string {
    const [_, token] = (request.headers as any).authorization?.split(' ') ?? []
    return token
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) return true
    const ctx = GqlExecutionContext.create(context)
    const type = ctx.getType()
    if (type === 'graphql') {
      const request = ctx.getContext().req
      const token = this.extractTokenFromHeader(request)
      try {
        await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      } catch {
        throw new UnauthorizedException()
      }
    } else if (type === 'ws') {
      const token = context.switchToWs().getClient().handshake.auth.token
      try {
        await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      } catch {
        throw new WsException('Invalid credentials.')
      }
    } else {
      const request = context.switchToHttp().getRequest()
      const token = this.extractTokenFromHeader(request)
      try {
        await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      } catch {
        throw new UnauthorizedException()
      }
    }
    return true
  }
}

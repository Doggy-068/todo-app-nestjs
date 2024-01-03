import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from '../constant/jwt.constant'
import type { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorator/public.decorator'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [
        context.getHandler(),
        context.getClass()
      ]
    )
    if (isPublic) return true
    const request = GqlExecutionContext.create(context).getContext().req
    const token = this.extractTokenFromHeader(request)
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      )
      request['user'] = payload
      return true
    } catch {
      throw new UnauthorizedException()
    }
  }
}

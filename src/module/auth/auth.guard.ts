import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constant'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../../decorator/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  private extractTokenFromHeader(request: Request): string {
    const [_, token] = (request.headers as any).authorization?.split(' ') ?? []
    return token
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass()
      ])
      if (isPublic) return true
      const request = context.switchToHttp().getRequest()
      const token = this.extractTokenFromHeader(request)
      await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }
}

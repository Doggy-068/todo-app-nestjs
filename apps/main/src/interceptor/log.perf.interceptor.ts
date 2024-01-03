import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LogService } from '../service/log.service'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class LogPerfInterceptor implements NestInterceptor {
  constructor(private logService: LogService) { }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = GqlExecutionContext.create(context).getContext().req
    const url = request.originalUrl
    const method = request.method
    const prev = Date.now()
    return next.
      handle().
      pipe(
        tap(() => {
          this.logService.insertLogPerf({
            url,
            method,
            timeTake: Date.now() - prev
          })
        })
      )
  }
}

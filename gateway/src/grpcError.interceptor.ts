import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError} from 'rxjs/operators'

@Injectable()
export class GrpcErrorIntercept implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        switch (err.code) {
          case 16:
            return throwError(() => new UnauthorizedException())
          case 13:
            return throwError(() => new BadRequestException())
          case 7:
            return throwError(() => new ForbiddenException())
          case 12:
            return throwError(() => new NotFoundException())
          default:
            return throwError(() => new Error(err))
        }
      }),
    )
  }
}